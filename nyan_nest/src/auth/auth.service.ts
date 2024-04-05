import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
	constructor(private readonly userService : UserService, private readonly jwtService : JwtService) { }

	async signIn(username : string, pass : string) : Promise<{ access_token: string }> {
		const user = await this.userService.findOne(username);
		if (user?.password !== pass) {
			throw new UnauthorizedException();
		}
		// TODO: Generate a JWT and return it here instead of the user object
		let payload = { sub: user.id, username: user.username}
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}