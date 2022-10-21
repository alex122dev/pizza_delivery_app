import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentsRepository: Repository<Component>,
  ) {}

  async getById(id: number): Promise<Component> {
    return this.componentsRepository.findOneBy({ id });
  }

  async getByName(name: string): Promise<Component> {
    return this.componentsRepository.findOneBy({ name });
  }

  async getAll(): Promise<Component[]> {
    return this.componentsRepository.find();
  }
}
