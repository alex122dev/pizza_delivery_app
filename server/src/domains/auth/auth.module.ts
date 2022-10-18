import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token } from './entities/token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET',
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
