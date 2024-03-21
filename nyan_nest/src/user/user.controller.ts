import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    /**
     * 创建用户
     * @returns httpRes
     */
    @Post()
    createUser(@Body() user: CreateUserDto) {
        this.userService.create(user)
        return "新增用户成功"
    }
    /**
     * 获取所有用户信息
     * @returns httpRes
     */
    @Get()
    findAllUser() {
        return this.userService.findAll();
    }
    /**
     * 根据用户id获取用户信息
     * @returns httpRes
     */
    @Get(':id')
    findUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }
    /**
     * 根据用户id删除用户信息
     * @returns httpRes
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }
}
