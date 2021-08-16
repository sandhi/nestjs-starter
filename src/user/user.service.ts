import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(@Body() createUserDto: CreateUserDto) {
    createUserDto.create_date = new Date();

    const salt = bcrypt.genSaltSync(10);

    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);

    this.userRepository.save(createUserDto);
    return `This action adds a new user ${JSON.stringify(createUserDto)}`;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOne(id);
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
