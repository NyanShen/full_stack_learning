import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

import { UserAccount } from './entities/user.account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserAccount) private readonly userRepository: Repository<UserAccount>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = new UserAccount();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    const res = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (res) {
      throw new BadRequestException({
        message: '用户已存在!', 
      });
    }
    return await this.userRepository.save(data);
  }

  async findAll() {
    const data = await this.userRepository.find();

    return data;
  }

  findById( id: number) {
    return this.userRepository.findOne({ where: { id: id } ,select:['id','username']});
  }

  findOne(username: string) {
    return this.userRepository.findOne({ where: { username: username }});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

}
