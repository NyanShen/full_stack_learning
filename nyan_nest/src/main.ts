import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// sweager模块配置
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module : any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('/sym');
	app.listen(3000);
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
		.addServer(`http://localhost:3000/swagger`, 'Local environment')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);
}
bootstrap();