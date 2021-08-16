import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nik: string;

  @Column()
  nama_depan: string;

  @Column()
  nama_belakang: string;

  @Column()
  roles: number;

  @Column()
  alamat: string;

  @Column()
  create_date: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
