import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { UserModule } from "./user/user.module";

// middleware
import { LoggerMiddleware } from "./common/middleware/logger.middleware";

@Module({
  imports: [
    // SequelizeModule模块, 连接数据库
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'passw0rD',
      database: 'sym',
      synchronize: true,
      autoLoadModels: true, // 自动加载实体
    }),
    // 业务模块
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('hello');
  }
}
