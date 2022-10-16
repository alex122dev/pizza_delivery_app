import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPayload } from './dto/userPayload.dto';
import { Token } from './entities/token.entity';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    generateTokens(payload: UserPayload) {
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '2d' })

        return { accessToken, refreshToken }
    }

    validateToken(token: string): UserPayload {
        try {
            const userPayload = this.jwtService.verify(token)
            return userPayload
        } catch (e) {
            return null
        }
    }

    async getTokenByValue(refreshToken: string) {
        const token = await this.tokensRepository.findOneBy({ refreshToken })
        return token
    }

    async getTokenByUserId(userId: number) {
        const token = await this.tokensRepository.findOneBy({ userId })
        return token
    }

    async saveToken(refreshToken: string, userId: number) {
        const token = await this.getTokenByUserId(userId)
        if (token) {
            token.refreshToken = refreshToken
            return await this.tokensRepository.save(token)
        }
        const user = await this.usersService.getById(userId)
        const newToken = this.tokensRepository.create({ refreshToken, userId, user })
        return await this.tokensRepository.save(newToken)
    }

    async removeTokenByValue(refreshToken: string) {
        const token = await this.getTokenByValue(refreshToken)
        return await this.tokensRepository.remove(token)
    }

    async removeTokenByUserId(userId: number) {
        const token = await this.getTokenByUserId(userId)
        if (!token) {
            return null
        }
        return await this.tokensRepository.remove(token)
    }

    async signUp(createUserDto: CreateUserDto) {
        const candidate = await this.usersService.getByEmail(createUserDto.email)
        if (candidate) {
            throw new HttpException(`User with email ${createUserDto.email} is existing`, HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(createUserDto.password, 3)
        const user = await this.usersService.create({
            ...createUserDto,
            password: hashPassword
        })

        const userPayload = new UserPayload(user)
        const tokens = this.generateTokens({ ...userPayload })
        await this.saveToken(tokens.refreshToken, user.id)

        return { ...tokens, user }
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.usersService.getByEmail(signInDto.email)
        if (!user) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST)
        }

        const passIsValid = await bcrypt.compare(signInDto.password, user.password)

        if (!passIsValid) {
            throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST)
        }

        const userPayload = new UserPayload(user)
        const tokens = this.generateTokens({ ...userPayload })
        await this.saveToken(tokens.refreshToken, user.id)

        return { ...tokens, user }
    }

    async signOut(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException({ message: 'User is not authorized' })
        }
        const token = await this.removeTokenByValue(refreshToken)
        if (!token) {
            throw new UnauthorizedException({ message: 'User is not authorized' })
        }

        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException({ message: 'User is not authorized' })
        }

        const userData = this.validateToken(refreshToken)
        const token = await this.getTokenByValue(refreshToken)
        if (!userData || !token) {
            throw new UnauthorizedException('User not authorized')
        }

        const user = await this.usersService.getById(userData.id)
        const userPayload = new UserPayload(user)
        const tokens = this.generateTokens({ ...userPayload })
        await this.saveToken(tokens.refreshToken, user.id)

        return { ...tokens, user }
    }
}
