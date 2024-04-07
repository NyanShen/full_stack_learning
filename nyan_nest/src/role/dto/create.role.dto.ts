import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    desc: string;

    @IsBoolean()
    isActive: boolean;
}