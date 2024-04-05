/**
 * 全局中间件函数式中间间
 */
import { Request, Response, NextFunction } from "express";
export const globalMiddleware = (req : Request, res : Response, next : NextFunction) => {
	console.log("全局函数式中间件")
	next();
}