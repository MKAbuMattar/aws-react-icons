import type { PathLike } from 'node:fs';
import { createWriteStream, existsSync, promises } from 'node:fs';
import type { RequestOptions } from 'node:https';
import https from 'node:https';
import { join } from 'node:path';
import type { URL } from 'node:url';
import AdmZip from 'adm-zip';

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
    'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/architecture/approved/architecture-icons/Asset-Package_07312025.49d3aab7f9e6131e51ade8f7c6c8b961ee7d3bb1.zip';
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
