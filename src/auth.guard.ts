import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'
import { UserService } from './user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ) {
    const { headers } = context.switchToHttp().getRequest()
    const decodeToken = jwt.decode(headers.authorization)
    if (decodeToken !== null) {
      if (this.userService.getUserByID(decodeToken.id) === null) {
        return false
      }
      return true;
    }
    return false
  }
}
