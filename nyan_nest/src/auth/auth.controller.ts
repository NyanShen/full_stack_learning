import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
	constructor(private readonly authService : AuthService) { }
	@Get('loginRender')
	@Render('default/login')
	renderLogin() {

	}

	@HttpCode(HttpStatus.OK)
	@Post('signIn')
	signIn(@Body() signInDto : Record<string, any>) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}