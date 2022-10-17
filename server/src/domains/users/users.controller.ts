import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserPayload } from '../auth/dto/userPayload.dto';
import { UserRequest } from './userRequest.decorator';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneByAdmin(@Param('id') id: number): Promise<User> {
    return await this.usersService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findOneByUser(@UserRequest() user: UserPayload): Promise<User> {
    return await this.usersService.getById(user.id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateByAdmin(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put()
  async updateByUser(@UserRequest() user: UserPayload, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(+user.id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeByAdmin(@Param('id') id: number): Promise<Omit<User, "id">> {
    await this.authService.removeTokenByUserId(id)
    return await this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async removeByUser(@UserRequest() user: UserPayload): Promise<Omit<User, "id">> {
    await this.authService.removeTokenByUserId(user.id)
    return this.usersService.remove(user.id);
  }
}
