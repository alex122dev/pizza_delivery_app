import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImageService } from './image.service';

@Module({
  providers: [ImageService],
  imports: [CloudinaryModule],
  exports: [ImageService],
})
export class ImageModule {}
