import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule
  ],
})
export class AppModule { }
