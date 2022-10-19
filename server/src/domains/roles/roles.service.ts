import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async getById(id: number): Promise<Role> {
    return this.rolesRepository.findOneBy({ id });
  }

  async getByValue(value: string): Promise<Role> {
    return this.rolesRepository.findOneBy({ value });
  }

  async getAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }
}
