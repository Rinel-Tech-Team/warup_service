import { RoleEntity } from 'src/domain/role/entities/role.entity';
import { UserEntity } from '../entities/user.entity';

export abstract class AdminRepository {
  abstract create(_user: Partial<UserEntity>): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract getProfile(id: string): Promise<UserEntity | null>;
  abstract update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;

  abstract findRoleId(roleId: string): Promise<RoleEntity | null>;
}
