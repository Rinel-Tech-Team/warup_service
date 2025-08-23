import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';

@Injectable()
export class FindAllRoleUseCase {
  constructor(private rolesRepo: RoleRepository) {}
  async execute(params: { page: number; limit: number; search?: string }) {
    return await this.rolesRepo.findAll(params);
  }
}
