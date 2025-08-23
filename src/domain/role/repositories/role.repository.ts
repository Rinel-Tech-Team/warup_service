import { Page } from 'src/domain/common/pagination';
import { RoleEntity } from '../entities/role.entity';

export abstract class RoleRepository {
  abstract create(data: Partial<RoleEntity>): Promise<RoleEntity>;
  abstract findByName(name: string): Promise<RoleEntity | null>;
  abstract findAll(params: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<Page<RoleEntity>>;
  abstract findById(id: string): Promise<RoleEntity | null>;
  abstract update(
    id: string,
    data: Partial<RoleEntity>,
  ): Promise<RoleEntity | null>;
  abstract delete(id: string): Promise<void>;
}
