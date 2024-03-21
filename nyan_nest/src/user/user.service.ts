
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) { }

  /**
   * 创建用户
   * @returns User
   */
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      userId: createUserDto.userId,
      username: createUserDto.username,
      realName: createUserDto.realName,
      password: createUserDto.password,
    });
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  /**
   * 根据id查询用户信息
   * @param id 
   * @returns User
   */
  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * 根据id删除用户信息
   * @param id 
   * @returns void
   */
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
