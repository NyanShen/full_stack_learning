import { join } from "path";
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
// sweager模块配置
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// 配置cookie-parser
import * as CookieParser from "cookie-parser";
// app module
import { AppModule } from './app.module';

declare const module : any;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	// 配置静态资源http://localhost:8888/static/man.png
	app.useStaticAssets(join(__dirname, '..', 'public'), {
		prefix: '/static/'
	});
	// api前缀
	app.setGlobalPrefix('/api');
	// 模版引擎
	app.setBaseViewsDir("views");
	app.setViewEngine("ejs");
	// cookie-parser
	app.use(CookieParser());
	// app监听端口
	app.listen(8888);
	// module hot
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
	/**
	 * SwaggerModule config
	 */
	const config = new DocumentBuilder()
		.setTitle('API')
		.setDescription("project description")
		.setVersion(process.env.npm_package_version)
		.addServer(`http://localhost:8888/swagger`, 'Local environment')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);
}
bootstrap();