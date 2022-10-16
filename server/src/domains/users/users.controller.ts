import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { UserPayload } from '../auth/dto/userPayload.dto';
import { User } from './user.decorator';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  findAll() {
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOneByAdmin(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOneByUser(@User() user: UserPayload) {
    return this.usersService.getById(+user.id);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  updateByAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put()
  updateByUser(@User() user: UserPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+user.id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeByAdmin(@Param('id') id: string) {
    await this.authService.removeTokenByUserId(+id)
    return await this.usersService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async removeByUser(@User() user: UserPayload) {
    await this.authService.removeTokenByUserId(+user.id)
    return this.usersService.remove(+user.id);
  }
}
