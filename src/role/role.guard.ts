import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EncryptService } from 'src/encryption/encrypt.service';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from './role.constants';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private encrypt: EncryptService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    const dec_roles = await this.encrypt.doDecrypt(user.meta_data);

    const user_roles = JSON.parse(dec_roles).roles;

    return requiredRoles.some((role) => role & user_roles);
  }
}
