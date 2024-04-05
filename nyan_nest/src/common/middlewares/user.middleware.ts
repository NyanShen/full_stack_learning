import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export class UserMiddleware implements NestMiddleware {
	use(req : Request, res : Response, next : NextFunction) {
		console.log("this is user midlleware");
		next()
	}
}