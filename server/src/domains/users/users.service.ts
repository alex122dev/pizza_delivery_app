import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const candidate = await this.getByEmail(createUserDto.email)
    if (candidate) {
      throw new HttpException(`User with email ${createUserDto.email} is existing`, HttpStatus.BAD_REQUEST)
    }

    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id })
  }

  async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id)
    return this.usersRepository.save({ ...user, ...updateUserDto })
  }

  async remove(id: number): Promise<Omit<User, 'id'>> {
    const user = await this.getById(id)
    return this.usersRepository.remove(user)
  }
}
