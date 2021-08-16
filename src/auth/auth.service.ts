import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/encryption/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const role = { roles: user.roles };
    const roleEncrypt = await this.encryptService.doEncrypt(
      JSON.stringify(role),
    );

    const payloads = {
      username: user.username,
      meta_data: roleEncrypt,
    };

    return {
      access_token: this.jwtService.sign(payloads),
    };
  }
}
