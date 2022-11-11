import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { ImageService } from './image.service';

@Module({
  providers: [ImageService],
  imports: [FilesModule],
  exports: [ImageService],
})
export class ImageModule {}
