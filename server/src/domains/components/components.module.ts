import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentsService } from './components.service';
import { Component } from './entities/component.entity';

@Module({
  providers: [ComponentsService],
  imports: [TypeOrmModule.forFeature([Component])],
  exports: [ComponentsService],
})
export class ComponentsModule {}
