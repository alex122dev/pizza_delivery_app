import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  static pathToStatic = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'static',
  );

  createNewFile(file: Express.Multer.File, folderName: string) {
    try {
      const ext = file.originalname.split('.').pop();
      const fileName = uuid.v4() + `.${ext}`;
      const filePath = path.resolve(FilesService.pathToStatic, folderName);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'File write error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  renameFile(oldFolder: string, newFolderName: string, fileName: string) {
    const oldPath = path.resolve(
      FilesService.pathToStatic,
      oldFolder,
      fileName,
    );
    const newPath = path.resolve(
      FilesService.pathToStatic,
      newFolderName,
      fileName,
    );

    fs.renameSync(oldPath, newPath);
    return true;
  }

  removeFile(fileName: string, folderName: string) {
    try {
      const filePath = path.resolve(FilesService.pathToStatic, folderName);
      const file = path.join(filePath, fileName);

      if (!fs.existsSync(file)) {
        return null;
      }

      fs.unlinkSync(file);
      return true;
    } catch (e) {
      throw new HttpException(
        'File deletion error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
