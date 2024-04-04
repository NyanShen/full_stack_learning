import { ApiProperty } from "@nestjs/swagger";
export class UploadFileDto {
	@ApiProperty({ type: "array", items: { type: 'string', format: 'binary' } })
	files : any[];
}