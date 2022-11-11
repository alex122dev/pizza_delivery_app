import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  createNewFile(file: Express.Multer.File, folder: string) {
    try {
      const ext = file.originalname.split('.').pop();
      const fileName = uuid.v4() + `.${ext}`;
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'static',
        folder,
      );

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

  renameFile(oldFolder: string, newFolder: string, fileName: string) {
    const oldPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'static',
      oldFolder,
      fileName,
    );
    const newPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'static',
      newFolder,
      fileName,
    );

    fs.renameSync(oldPath, newPath);
    return true;
  }

  removeFile(fileName: string, folder: string) {
    try {
      const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'static',
        folder,
      );
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
