// 导入所需的类和装饰器
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto'; // 导入创建用户的数据传输对象
import { UpdateUserDto } from './dto/update.user.dto'; // 导入更新用户的数据传输对象

import { UserAccount } from './entities/user.account.entity'; // 导入用户账户实体
import { Repository } from 'typeorm'; // 导入TypeORM的Repository类
import { InjectRepository } from '@nestjs/typeorm'; // 导入NestJS的@InjectRepository装饰器

// 使用@Injectable装饰器标记该类为NestJS的提供者
@Injectable()
export class UserService {
  // 构造函数，注入UserAccount实体的Repository
  // 构造函数，用于初始化类的实例
  // 构造函数，用于初始化类的实例
  constructor(
    // 使用@InjectRepository装饰器注入UserAccount实体对应的Repository实例
    // @InjectRepository是NestJS中的一个装饰器，用于自动注入TypeORM的Repository
    // UserAccount是实体类，表示数据库中的用户账户表
    @InjectRepository(UserAccount) private readonly userRepository: Repository<UserAccount>,
  ) {}

  // 创建用户的方法
  async create(createUserDto: CreateUserDto) {
    // 创建一个新的UserAccount实例
    const data = new UserAccount();
    // 设置用户名和密码
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    // 查询数据库中是否已存在相同用户名的用户
    const res = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    // 如果用户已存在，抛出BadRequestException异常
    if (res) {
      throw new BadRequestException({
        message: '用户已存在!', 
      });
    }
    // 保存新用户到数据库
    return await this.userRepository.save(data);
  }

  // 查询所有用户的方法
  async findAll() {
    // 从数据库中查找所有用户
    const data = await this.userRepository.find();

    return data;
  }

  // 根据ID查找用户的方法
  findById( id: number) {
    // 查找指定ID的用户，只选择id和username字段
    return this.userRepository.findOne({ where: { id: id } ,select:['id','username']});
  }

  // 根据用户名查找用户的方法
  findOne(username: string) {
    // 查找指定用户名的用户
    return this.userRepository.findOne({ where: { username: username }});
  }

  // 更新用户的方法
  update(id: number, updateUserDto: UpdateUserDto) {
    // 更新指定ID的用户信息
    return this.userRepository.update(id, updateUserDto);
  }

  // 删除用户的方法
  remove(id: number) {
    // 删除指定ID的用户
    return this.userRepository.delete(id);
  }

}
