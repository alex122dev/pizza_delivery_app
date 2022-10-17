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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user)
  }

  async getAll(): Promise<User[]> {
    const users = await this.usersRepository.find()
    return users
  }

  async getById(id: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id })
      return user
    } catch (e) {
      return null
    }
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id)
    return await this.usersRepository.save({ ...user, ...updateUserDto })
  }

  async remove(id: number): Promise<Omit<User, 'id'>> {
    const user = await this.getById(id)
    return await this.usersRepository.remove(user)
  }
}
