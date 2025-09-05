import { RoleEntity } from 'src/domain/role/entities/role.entity';
import { UserEntity } from '../entities/user.entity';

export abstract class CustomerRepository {
  abstract create(customer: Partial<UserEntity>): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract findRoleId(): Promise<RoleEntity | null>;

  abstract findById(id: string): Promise<UserEntity | null>;

  abstract update(
    id: string,
    customer: Partial<UserEntity>,
  ): Promise<UserEntity>;
}
