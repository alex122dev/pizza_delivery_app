import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsService } from './components.service';
import { Component } from './entities/component.entity';
import { ComponentsController } from './components.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [ComponentsService],
  imports: [TypeOrmModule.forFeature([Component]), AuthModule, UsersModule],
  exports: [ComponentsService],
  controllers: [ComponentsController],
})
export class ComponentsModule {}
