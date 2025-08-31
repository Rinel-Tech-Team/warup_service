import { UserEntity } from 'src/domain/user/entities/user.entity';

export class RoleEntity {
  id: string;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  // Relasi
  users?: UserEntity[];

  constructor(data: Partial<RoleEntity>) {
    Object.assign(this, data);
  }
}
