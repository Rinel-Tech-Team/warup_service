import {
  Body,
  Controller,
  Delete,
  Get,
  Post as HttpPost,
  Param,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRoleUseCase } from 'src/applications/role/usecases/create-role.usecase';
import { DeleteRoleUseCase } from 'src/applications/role/usecases/delete-role.usecase';
import { FindAllRoleUseCase } from 'src/applications/role/usecases/find-all-role.usecase';
import { FindByIdRoleUseCase } from 'src/applications/role/usecases/find-by-id-role.usecase';
import { UpdateRoleUseCase } from 'src/applications/role/usecases/update-role.usecase';
import { CreateRoleDTO } from '../dto/create-role.dto';
import { UpdateRoleDTO } from '../dto/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(
    private createUC: CreateRoleUseCase,
    private findAllUC: FindAllRoleUseCase,
    private findByIdUC: FindByIdRoleUseCase,
    private updateUC: UpdateRoleUseCase,
    private deleteUC: DeleteRoleUseCase,
  ) {}

  @HttpPost('create')
  async Create(@Body() body: CreateRoleDTO) {
    const role = await this.createUC.execute({
      name: body.name,
      status: body.status,
    });
    return { data: role, message: 'Role created successfully' };
  }

  @Get()
  async GetAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ) {
    const roles = await this.findAllUC.execute({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    return { data: roles, message: 'Roles Get Successfully' };
  }

  @Get(':id')
  async GetById(@Param('id') id: string) {
    const role = await this.findByIdUC.execute(id);
    return { data: role, message: 'Role Get Successfully' };
  }

  @Put(':id')
  async Update(@Param('id') id: string, @Body() body: UpdateRoleDTO) {
    const roleUpdate = await this.updateUC.execute({ id, ...body });
    return { data: roleUpdate, message: 'Role Updated Successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUC.execute(id);
    return { message: 'Role Deleted Successfully' };
  }
}
