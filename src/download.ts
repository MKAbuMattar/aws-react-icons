import type { PathLike } from 'fs';
import { createReadStream, createWriteStream, existsSync, promises } from 'fs';
import type { RequestOptions } from 'https';
import https from 'https';
import { join } from 'path';
import unzipper from 'unzipper';
import type { URL } from 'url';

async function downloadFile(
  url: string | RequestOptions | URL,
  filePath: PathLike,
) {
  const writeStream = createWriteStream(filePath);

  return new Promise<void>((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Failed to download file: ${response.statusCode} ${response.statusMessage}`,
        );
        reject();
        return;
      }

      response.pipe(writeStream);

      writeStream.on('finish', async () => {
        if (!existsSync(filePath)) {
          console.error('Downloaded file does not exist:', filePath);
          reject();
          return;
        }
        resolve();
      });

      response.on('error', reject);
    });
  });
}

async function unzipFile(zipFilePath: string, unzippedPath: string) {
  return new Promise<void>((resolve, reject) => {
    createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: unzippedPath }))
      .on('close', resolve)
      .on('error', reject);
  });
}

(async () => {
  // source: https://aws.amazon.com/architecture/icons/
  const fileUrl =
    'https://d1.awsstatic.com/webteam/architecture-icons/q1-2024/Asset-Package_02062024.c893ec2a2df5a0b881da3ad9a3213e5f6c8664d4.zip';
  const downloadedFilePath = join(process.cwd(), 'downloadedFile.zip');
  const unzippedPath = join(process.cwd(), 'aws-icons');

  try {
    await downloadFile(fileUrl, downloadedFilePath);
    console.info('File downloaded successfully.');

    if (!existsSync(downloadedFilePath)) {
      console.error('Downloaded file does not exist:', downloadedFilePath);
      return;
    }

    await unzipFile(downloadedFilePath, unzippedPath);
    console.info('File unzipped successfully.');

    await promises.unlink(downloadedFilePath);
    console.info('Downloaded file deleted.');
  } catch (error) {
    console.error(error);
  }
})();
