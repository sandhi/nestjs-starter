import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptService } from './encrypt.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  exports: [EncryptService],
  providers: [EncryptService],
})
export class EncryptModule {}
