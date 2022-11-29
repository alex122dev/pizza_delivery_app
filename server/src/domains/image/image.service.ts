import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async saveImage(
    image: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    const imageObj = await this.cloudinaryService.uploadFile(image, folderName);
    return imageObj.url;
  }

  async getNewImageLocation(
    oldLocation: string,
    newFolderName: string,
  ): Promise<string> {
    return this.cloudinaryService.renameFile(oldLocation, newFolderName);
  }

  async replaceProductImage(
    oldLocation: string,
    newImageFile: Express.Multer.File,
    newFolderName: string,
  ): Promise<string> {
    return this.cloudinaryService.replaceFile(
      oldLocation,
      newImageFile,
      newFolderName,
    );
  }
}
