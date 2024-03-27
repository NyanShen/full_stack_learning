import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    const res = await this.user.findOne({
      where: { username: createUserDto.username },
    });
    if (res) {
      throw new BadRequestException({
        message: '用户已存在!', 
      });
    }
    return await this.user.save(data);
  }

  async findAll() {
    const data = await this.user.find();

    return data;
  }

  findOne(id: number) {
    return this.user.findOne({ where: { id: id } ,select:['id','username']});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

}
