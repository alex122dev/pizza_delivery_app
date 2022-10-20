import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { StatusesService } from './statuses.service';

@Module({
  providers: [StatusesService],
  imports: [TypeOrmModule.forFeature([Status])],
  exports: [StatusesService],
})
export class StatusesModule {}
