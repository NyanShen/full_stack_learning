import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create.role.dto";
import { UpdateRoleDto } from "./dto/update.role.dto";

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) { }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        let role = new Role();
        role.name = createRoleDto.name;
        role.desc = createRoleDto.desc;
        role.isActive = createRoleDto.isActive;
        const res = await this.roleRepository.findOne({
            where: { name: createRoleDto.name },
        });
        if (res) {
            throw new BadRequestException({
                message: '角色已存在!',
            });
        }
        return await this.roleRepository.save(role);
    }

    async delete(id: number): Promise<DeleteResult> {
        const target = await this.roleRepository.findOne({
            where: { id: id },
        });
        if (!target) {
            throw new BadRequestException({
                message: '角色不存在!',
            });
        }
        return this.roleRepository.delete(id);
    }


    async update(updateRoleDto: UpdateRoleDto): Promise<UpdateResult> {
        const target = await this.roleRepository.findOne({
            where: { id: updateRoleDto.id },
        });
        if (!target) {
            throw new BadRequestException({
                message: '角色不存在!',
            });
        }
        return this.roleRepository.update(updateRoleDto.id, updateRoleDto);
    }


    async list(): Promise<Role[]> {
        return await this.roleRepository.find()
    }

}