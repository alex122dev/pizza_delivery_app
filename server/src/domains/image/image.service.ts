import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';

@Injectable()
export class ImageService {
  constructor(private filesService: FilesService) {}

  saveImage(image: Express.Multer.File, folderName: string): string {
    const fileName = this.filesService.createNewFile(image, folderName);
    return this.generateLocationString(folderName, fileName);
  }

  generateLocationString(folderName: string, fileName: string): string {
    return `${folderName}/${fileName}`;
  }

  getNewImageLocation(oldLocation: string, newFolderName: string): string {
    const oldFolder = oldLocation.split('/')[0];
    const fileName = oldLocation.split('/')[1];
    this.filesService.renameFile(oldFolder, newFolderName, fileName);
    const imageLocation = this.generateLocationString(newFolderName, fileName);
    return imageLocation;
  }

  replaceProductImage(
    oldLocation: string,
    newImageFile: Express.Multer.File,
    newFolderName: string,
  ): string {
    const oldFolder = oldLocation.split('/')[0];
    const fileName = oldLocation.split('/')[1];
    this.filesService.removeFile(fileName, oldFolder);
    const newFileName = this.filesService.createNewFile(
      newImageFile,
      newFolderName,
    );
    const imageLocation = this.generateLocationString(
      newFolderName,
      newFileName,
    );
    return imageLocation;
  }
}
