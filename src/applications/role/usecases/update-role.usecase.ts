import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';

@Injectable()
export class UpdateRoleUseCase {
  constructor(private roleRepo: RoleRepository) {}
  async execute(input: { id: string; name?: string; status?: boolean }) {
    const { id, ...data } = input;
    return await this.roleRepo.update(id, data);
  }
}
