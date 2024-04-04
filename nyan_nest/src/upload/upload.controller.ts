import { Get, Controller, Post, Render, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UploadFileDto } from "./dto/upload.file.dto";
import { createWriteStream } from "fs";
import { join } from "path";

@Controller('upload')
export class UploadController {
	@Get()
	@Render('default/upload')
	index() {

	}
	@Post()
	@UseInterceptors(FileInterceptor('file')) // file是传过来的字端名字
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: "desc",
		type: UploadFileDto
	})
	uploadFile(@UploadedFile() file : any) {
		console.log("upload file>>>>", file)
		let writeScream = createWriteStream(join(__dirname, '..', 'public/upload', `${Date.now()}_${file.originalname}`))
		writeScream.write(file.buffer)
		return "上传图片成功"
	}
	
	@Get('multi')
	@Render('default/uploadMulti')
	indexMulti() {
	
	}
	@Post()
	@UseInterceptors(FilesInterceptor('files')) // file是传过来的字端名字
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: "desc",
		type: UploadFileDto
	})
	uploadFiles(@UploadedFiles() files : any) {
		console.log("upload files>>>>", files)
		for (let file of files) {
			let writeScream = createWriteStream(join(__dirname, '..', 'public/upload', `${Date.now()}_${file.originalname}`))
			writeScream.write(file.buffer)
		}
		return "上传图片成功"
	}
}