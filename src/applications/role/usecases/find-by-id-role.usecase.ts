import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';

@Injectable()
export class FindByIdRoleUseCase {
  constructor(private rolesRepo: RoleRepository) {}
  async execute(id: string) {
    const role = await this.rolesRepo.findById(id);
    if (!role) throw new NotFoundException('role not found');
    return role;
  }
}
