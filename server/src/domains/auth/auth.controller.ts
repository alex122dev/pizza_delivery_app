import { Controller, Post, Body, UsePipes, ValidationPipe, Req, Res, Get, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UsePipes(ValidationPipe)
    @Post('signup')
    async signUp(@Res({ passthrough: true }) res: Response, @Body() createUserDto: CreateUserDto) {
        const userData = await this.authService.signUp(createUserDto)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return userData
    }

    @UsePipes(ValidationPipe)
    @Post('signin')
    async signIn(@Res({ passthrough: true }) res: Response, @Body() signInDto: SignInDto) {
        const userData = await this.authService.signIn(signInDto)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return userData
    }

    @UseGuards(AuthGuard)
    @Post('signout')
    async signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { refreshToken } = req.cookies
        const token = await this.authService.signOut(refreshToken)
        res.clearCookie('refreshToken')
        return { token, message: 'The user has logged out' }
    }

    @Get('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { refreshToken } = req.cookies
        const userData = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        return userData
    }
}
