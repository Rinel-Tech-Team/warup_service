import { ConflictException, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/domain/role/entities/role.entity';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';

@Injectable()
export class CreateRoleUseCase {
  constructor(private rolesRepo: RoleRepository) {}
  async execute(input: { name: string; status: boolean }) {
    const exists = await this.rolesRepo.findByName(input.name);
    if (exists) throw new ConflictException('name already exists');
    return this.rolesRepo.create({ ...input });
  }
}
