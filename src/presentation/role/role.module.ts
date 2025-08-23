import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';
import { RolePrismaRepository } from 'src/infrastructure/repositories/role.prisma.repository';
import { CreateRoleUseCase } from 'src/applications/role/usecases/create-role.usecase';
import { FindAllRoleUseCase } from 'src/applications/role/usecases/find-all-role.usecase';
import { FindByIdRoleUseCase } from 'src/applications/role/usecases/find-by-id-role.usecase';
import { UpdateRoleUseCase } from 'src/applications/role/usecases/update-role.usecase';
import { DeleteRoleUseCase } from 'src/applications/role/usecases/delete-role.usecase';

@Module({
  controllers: [RoleController],
  providers: [
    { provide: RoleRepository, useClass: RolePrismaRepository },
    CreateRoleUseCase,
    FindAllRoleUseCase,
    FindByIdRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
  ],
})
export class RoleModule {}
