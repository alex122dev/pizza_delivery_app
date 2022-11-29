import { Injectable } from '@nestjs/common';
import * as toStream from 'buffer-to-stream';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  getPublicIdFromUrl(url: string): string {
    return url.split('/').slice(7).join('/').split('.').slice(0, -1).join('.');
  }

  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: folderName },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }

  async renameFile(url: string, newFolder: string): Promise<string> {
    const oldPublicId = this.getPublicIdFromUrl(url);
    const fileNameWithoutExt = oldPublicId.split('/').slice(-1)[0];
    const newPublicId = `${newFolder}/${fileNameWithoutExt}`;

    if (oldPublicId === newPublicId) {
      return url;
    }

    const result = await v2.uploader.rename(oldPublicId, newPublicId);
    return result.url;
  }

  async removeFile(url: string): Promise<{ result: string }> {
    const publicId = this.getPublicIdFromUrl(url);
    return v2.uploader.destroy(publicId);
  }

  async replaceFile(
    oldUrl: string,
    file: Express.Multer.File,
    newFolder: string,
  ): Promise<string> {
    await this.removeFile(oldUrl);
    const result = await this.uploadFile(file, newFolder);
    return result.url;
  }
}
