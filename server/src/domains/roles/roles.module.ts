import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  exports: [RolesService],
})
export class RolesModule {}
