import { RoleEntity } from 'src/domain/role/entities/role.entity';

export class UserEntity {
  id: string;
  full_name: string;
  email: string;
  username: string;
  password: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  roleId: string;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
