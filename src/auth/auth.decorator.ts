import { SetMetadata } from '@nestjs/common';
import { AUTH_CONSTANT } from './auth.constant';

export const AllowAnonymous = () =>
  SetMetadata(AUTH_CONSTANT.ALLOW_ANONYMOUS, true);
