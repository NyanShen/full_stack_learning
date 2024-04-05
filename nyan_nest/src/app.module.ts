import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// 加载配置文件
import { ConfigModule } from '@nestjs/config';
// 数据模型
import { TypeOrmModule } from '@nestjs/typeorm';
// App模块
import { AppController } from './app.controller';
import { AppService } from './app.service';
// module业务模块引入
import { UserModule } from "./user/user.module";
// 控制器
import { UploadController } from "./upload/upload.controller";

// middleware中间件
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		// The code will load and parse a .env file from the default location
		ConfigModule.forRoot({
			envFilePath: ".env.development"
		}),
		// TypeOrmModule模块, 连接数据库
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'passw0rD',
			database: 'sym',
			synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
			retryDelay: 500, //重试连接数据库间隔
			retryAttempts: 10, //重试连接数据库的次数
			autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
			entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
		}),
		// 业务模块
		UserModule,
		AuthModule
	],
	controllers: [AppController, UploadController],
	providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
	configure(consumer : MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes('user');
	}
}