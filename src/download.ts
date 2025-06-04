import type { PathLike } from 'fs';
import { createReadStream, createWriteStream, existsSync, promises } from 'fs';
import type { RequestOptions } from 'https';
import https from 'https';
import { join } from 'path';
import AdmZip from 'adm-zip';
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
    try {
      const zip = new AdmZip(zipFilePath);
      zip.extractAllTo(unzippedPath, true);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  const fileUrl =
    'https://d1.awsstatic.com/webteam/architecture-icons/q1-2025/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803.zip';
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
