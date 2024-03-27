// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create.user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty() //验证是否为空
  @IsString() //是否为字符串
  username: string;

  @IsNotEmpty()
  password: string;
  
  @IsNotEmpty()
  code: string;
}
