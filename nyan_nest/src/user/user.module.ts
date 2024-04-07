import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAccount } from './entities/user.account.entity';
import { UserProfile } from './entities/user.profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount, UserProfile])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
