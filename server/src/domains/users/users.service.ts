import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user)
  }

  async getAll() {
    const users = await this.usersRepository.find()
    return users
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOneBy({ id })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id)
    return await this.usersRepository.save({ ...user, ...updateUserDto })
  }

  async remove(id: number) {
    const user = await this.getById(id)
    return await this.usersRepository.remove(user)
  }
}
