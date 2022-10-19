import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const candidate = await this.getByEmail(createUserDto.email);
    if (candidate) {
      throw new HttpException(
        `User with email ${createUserDto.email} is existing`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.usersRepository.create(createUserDto);
    const role = await this.rolesService.getByValue('USER');
    return this.usersRepository.save({ ...user, roles: [role] });
  }

  async getAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: { roles: true } });
  }

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }

  async getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async remove(id: number): Promise<Omit<User, 'id'>> {
    const user = await this.getById(id);
    return this.usersRepository.remove(user);
  }

  async addRoleForUser(updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    const user = await this.getById(updateUserRoleDto.userId);
    const role = await this.rolesService.getByValue(
      updateUserRoleDto.roleValue,
    );
    return this.usersRepository.save({ ...user, roles: [...user.roles, role] });
  }

  async deleteUsersRole(updateUserRoleDto: UpdateUserRoleDto): Promise<User> {
    const user = await this.getById(updateUserRoleDto.userId);
    const newRoles = user.roles.filter(
      (role) => role.value !== updateUserRoleDto.roleValue,
    );
    return this.usersRepository.save({ ...user, roles: newRoles });
  }
}
