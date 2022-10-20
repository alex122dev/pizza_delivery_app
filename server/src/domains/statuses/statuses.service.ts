import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status) private statusesRepository: Repository<Status>,
  ) {}

  async getById(id: number): Promise<Status> {
    return this.statusesRepository.findOneBy({ id });
  }

  async getByValue(value: string): Promise<Status> {
    return this.statusesRepository.findOneBy({ value });
  }

  async getAll(): Promise<Status[]> {
    return this.statusesRepository.find();
  }
}
