import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [StatusesService],
  imports: [TypeOrmModule.forFeature([Status]), AuthModule, UsersModule],
  exports: [StatusesService],
  controllers: [StatusesController],
})
export class StatusesModule {}
