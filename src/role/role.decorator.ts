import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './role.constants';
import { Role } from './role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
