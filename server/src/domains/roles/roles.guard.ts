import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        throw new UnauthorizedException();
      }

      const bearer = authorizationHeader.split(' ')[0];
      const accessToken = authorizationHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !accessToken) {
        throw new UnauthorizedException();
      }

      const userPayload = this.authService.getUserPayloadFromToken(accessToken);

      if (!userPayload) {
        throw new UnauthorizedException();
      }

      req.user = userPayload;

      const isAccess = userPayload.roles.some((role) =>
        requiredRoles.includes(role.value),
      );

      return isAccess;
    } catch (e) {
      if (e.status === 401) {
        throw new UnauthorizedException();
      }
      throw new ForbiddenException();
    }
  }
}
