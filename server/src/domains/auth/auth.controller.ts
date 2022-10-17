import { Controller, Post, Body, UsePipes, ValidationPipe, Req, Res, Get, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthReturnDto } from './dto/authReturn.dto';
import { SignInDto } from './dto/signin.dto';
import { SignOutDto } from './dto/signOut.dto';

@Controller('auth')
export class AuthController {
    static COOKIE_NAME: string = 'refreshToken'
    static COOKIE_OPTIONS: CookieOptions = {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
        httpOnly: true
    }

    constructor(private readonly authService: AuthService) { }

    @UsePipes(ValidationPipe)
    @Post('signup')
    async signUp(@Res({ passthrough: true }) res: Response, @Body() createUserDto: CreateUserDto): Promise<AuthReturnDto> {
        const userData = await this.authService.signUp(createUserDto)
        res.cookie(AuthController.COOKIE_NAME, userData.refreshToken, AuthController.COOKIE_OPTIONS)
        return userData
    }

    @UsePipes(ValidationPipe)
    @Post('signin')
    async signIn(@Res({ passthrough: true }) res: Response, @Body() signInDto: SignInDto): Promise<AuthReturnDto> {
        const userData = await this.authService.signIn(signInDto)
        res.cookie(AuthController.COOKIE_NAME, userData.refreshToken, AuthController.COOKIE_OPTIONS)
        return userData
    }

    @UseGuards(AuthGuard)
    @Post('signout')
    async signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<SignOutDto> {
        const { refreshToken } = req.cookies
        const token = await this.authService.signOut(refreshToken)
        res.clearCookie(AuthController.COOKIE_NAME)
        return { token, message: 'The user has logged out' }
    }

    @Get('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<AuthReturnDto> {
        const { refreshToken } = req.cookies
        const userData = await this.authService.refresh(refreshToken)
        res.cookie(AuthController.COOKIE_NAME, userData.refreshToken, AuthController.COOKIE_OPTIONS)
        return userData
    }
}
