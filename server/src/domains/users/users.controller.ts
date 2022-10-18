import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserPayloadDto } from '../auth/dto/userPayload.dto';
import { UserRequest } from './userRequest.decorator';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.getAll();
    const userDtoArray = users.map((user: User) => new UserDto(user));
    return userDtoArray;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    const user = await this.usersService.getById(id);
    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUser(@UserRequest() user: UserPayloadDto): Promise<UserDto> {
    const userData = await this.usersService.getById(user.id);
    return new UserDto(userData);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put()
  async updateCurrentUser(
    @UserRequest() user: UserPayloadDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const userData = await this.usersService.update(user.id, updateUserDto);
    return new UserDto(userData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeUserById(@Param('id') id: number): Promise<DeleteUserDto> {
    await this.authService.removeTokenByUserId(id);
    const userData = await this.usersService.remove(id);
    return new DeleteUserDto(userData);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async removeCurrentUser(
    @UserRequest() user: UserPayloadDto,
  ): Promise<DeleteUserDto> {
    await this.authService.removeTokenByUserId(user.id);
    const userData = await this.usersService.remove(user.id);
    return new DeleteUserDto(userData);
  }
}
