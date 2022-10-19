import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => UsersModule)],
  exports: [RolesService],
})
export class RolesModule {}
