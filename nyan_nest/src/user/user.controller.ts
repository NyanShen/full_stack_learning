import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  // Req,
  // BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from '../auth/auth.guard';

@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('renderer')
  @Render('default/user')
  renderUser() {
	  return { title: "hello renderer ejs."}
  }
  @Post('create')
  @ApiOperation({ summary: '新增用户' })
  createUser(@Body() body: CreateUserDto) {
    // if (
    //   req.session.code?.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    // ) {
    //   return this.userService.create(body)
    // } else {
    //   throw new BadRequestException({
    //     message: '验证码错误',
    //   });
    // }
	return this.userService.create(body)
  }

  @Get('list')
  @ApiOperation({ summary: '查询用户列表' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  @ApiOperation({ summary: '根据用户名查询用户' })
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @Patch(':id')
  @ApiOperation({ summary: '根据id更新用户' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据id删除用户' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
