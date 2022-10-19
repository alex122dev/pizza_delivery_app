import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPayloadDto } from '../auth/dto/userPayload.dto';
import { UsersService } from '../users/users.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const userPayload: UserPayloadDto = req.user;

      if (!userPayload) {
        throw new UnauthorizedException();
      }

      const user = await this.usersService.getById(userPayload.id);
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const userRoles = user.roles.map((role) => role.value);
      const isAccess = requiredRoles.every((role) => userRoles.includes(role));

      return isAccess;
    } catch (e) {
      if (e.status === 401) {
        throw new UnauthorizedException();
      }
      throw new ForbiddenException();
    }
  }
}
