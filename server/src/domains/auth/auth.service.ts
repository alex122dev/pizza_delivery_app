import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPayloadDto } from './dto/userPayload.dto';
import { Token } from './entities/token.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { TokensReturnDto } from './dto/tokensReturn.dto';
import { AuthReturnDto } from './dto/authReturn.dto';
import { User } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  static ACCESS_TOKEN_SIGN_OPTIONS: JwtSignOptions = {
    expiresIn: '30m', // 30 Minutes
  };

  static REFRESH_TOKEN_SIGN_OPTIONS: JwtSignOptions = {
    expiresIn: '2d', // 2 days
  };

  constructor(
    @InjectRepository(Token) private tokensRepository: Repository<Token>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private async assignTokenToUser(user: User): Promise<TokensReturnDto> {
    const userPayload = new UserPayloadDto(user);
    const tokens = this.generateTokens({ ...userPayload });
    await this.saveToken(tokens.refreshToken, user.id);
    return tokens;
  }

  generateTokens(payload: UserPayloadDto): TokensReturnDto {
    const accessToken = this.jwtService.sign(
      payload,
      AuthService.ACCESS_TOKEN_SIGN_OPTIONS,
    );
    const refreshToken = this.jwtService.sign(
      payload,
      AuthService.REFRESH_TOKEN_SIGN_OPTIONS,
    );

    return { accessToken, refreshToken };
  }

  getUserPayloadFromToken(token: string): UserPayloadDto | null {
    try {
      const userPayload = this.jwtService.verify(token);
      return userPayload;
    } catch (e) {
      return null;
    }
  }

  async getTokenByValue(refreshToken: string): Promise<Token> {
    return this.tokensRepository.findOneBy({ refreshToken });
  }

  async getTokenByUserId(userId: number): Promise<Token> {
    return this.tokensRepository.findOneBy({ userId });
  }

  async saveToken(refreshToken: string, userId: number): Promise<Token> {
    const token = await this.getTokenByUserId(userId);
    if (token) {
      token.refreshToken = refreshToken;
      return this.tokensRepository.save(token);
    }
    const user = await this.usersService.getById(userId);
    const newToken = this.tokensRepository.create({
      refreshToken,
      userId,
      user,
    });
    return this.tokensRepository.save(newToken);
  }

  async removeTokenByValue(refreshToken: string): Promise<Omit<Token, 'id'>> {
    try {
      const token = await this.getTokenByValue(refreshToken);
      return await this.tokensRepository.remove(token);
    } catch (e) {
      return null;
    }
  }

  async removeTokenByUserId(userId: number): Promise<Omit<Token, 'id'>> {
    try {
      const token = await this.getTokenByUserId(userId);
      return await this.tokensRepository.remove(token);
    } catch (e) {
      return null;
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<AuthReturnDto> {
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.SALT),
    );
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });

    const tokens = await this.assignTokenToUser(user);
    const userDto = new UserDto(user);

    return { ...tokens, user: userDto };
  }

  async signIn(signInDto: SignInDto): Promise<AuthReturnDto> {
    const user = await this.usersService.getByEmail(signInDto.email);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.assignTokenToUser(user);
    const userDto = new UserDto(user);

    return { ...tokens, user: userDto };
  }

  async signOut(refreshToken: string): Promise<Omit<Token, 'id'>> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const token = await this.removeTokenByValue(refreshToken);
    if (!token) {
      throw new UnauthorizedException();
    }

    return token;
  }

  async refresh(refreshToken: string): Promise<AuthReturnDto> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const userData = this.getUserPayloadFromToken(refreshToken);
    const token = await this.getTokenByValue(refreshToken);
    if (!userData || !token) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.getById(userData.id);
    const tokens = await this.assignTokenToUser(user);
    const userDto = new UserDto(user);

    return { ...tokens, user: userDto };
  }
}
