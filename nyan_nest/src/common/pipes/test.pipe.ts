import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TestPipe implements PipeTransform {
	// value get或 post注入进来的数据
	transform(value: any, metadata: ArgumentMetadata) {
		
		return
	}
}