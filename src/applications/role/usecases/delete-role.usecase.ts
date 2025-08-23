import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(private roleRepo: RoleRepository) {}
  async execute(id: string) {
    await this.roleRepo.delete(id);
    return { success: true };
  }
}
