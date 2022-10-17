import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest()
            const authorizationHeader = req.headers.authorization

            if (!authorizationHeader) {
                throw new UnauthorizedException()
            }

            const bearer = authorizationHeader.split(' ')[0]
            const accessToken = authorizationHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !accessToken) {
                throw new UnauthorizedException()
            }

            const userPayload = this.authService.getUserPayloadFromToken(accessToken)

            if (!userPayload) {
                throw new UnauthorizedException()
            }

            req['user'] = userPayload
            return true
        } catch (e) {
            throw new UnauthorizedException()
        }
    }
}
