import { Body, Controller, Post, Get, Delete, Param, Patch } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create.role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateRoleDto } from "./dto/update.role.dto";

@ApiTags('角色模块')
@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }


    /**
     * 新增角色
     * @param body {name: string; desc: string}
     * @returns 
     */
    @Post('create')
    @ApiOperation({ summary: "角色新增" })
    createRole(@Body() body: CreateRoleDto) {
        return this.roleService.create(body);
    }

    /**
     * 删除角色
     */
    @Delete('/remove/:id')
    @ApiOperation({ summary: '根据id删除角色' })
    removeRole(@Param('id') id: string) {
        return this.roleService.delete(+id);
    }

    /**
     * 修改角色
     */
    @Patch('/update')
    updateRole(@Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(updateRoleDto);
    }

    /**
     * 查询角色列表
     */
    @Get('list')
    @ApiOperation({ summary: "角色列表" })
    listRole() {
        return this.roleService.list()
    }

}