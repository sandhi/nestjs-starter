import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  nik: string;

  @IsNotEmpty()
  @IsString()
  nama_depan: string;

  @IsString()
  nama_belakang: string;

  create_date: Date;
}
