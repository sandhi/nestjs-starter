import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_CONSTANT } from './auth.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAllowAnonymous = this.reflector.getAllAndOverride<boolean>(
      AUTH_CONSTANT.ALLOW_ANONYMOUS,
      [context.getHandler(), context.getClass()],
    );

    if (isAllowAnonymous) {
      return true;
    }

    return super.canActivate(context);
  }
}
