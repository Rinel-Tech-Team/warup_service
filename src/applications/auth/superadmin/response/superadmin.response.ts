import { UserEntity } from 'src/domain/user/entities/user.entity';

export class SuperadminResponse {
  id: string;
  full_name: string;
  email: string;
  username: string;
  status: boolean;
  role: {
    id: string;
    name: string;
  };
  constructor(superadmin: any) {
    ((this.id = superadmin.id), (this.full_name = superadmin.full_name));
    this.email = superadmin.email;
    this.username = superadmin.username;
    this.status = superadmin.status;
    this.role = superadmin.role;
  }
}
