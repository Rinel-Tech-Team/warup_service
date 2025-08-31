import { Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/domain/user/repositories/admin.repository';
import { UpdateSuperadminDTO } from 'src/presentation/auth/superadmin/dto/update-superadmin.dto';

@Injectable()
export class UpdateSuperadminUsecase {
  constructor(private readonly adminRepo: AdminRepository) {}

  async execute(userId: string, dto: UpdateSuperadminDTO) {
    return await this.adminRepo.update(userId, {
      email: dto.email,
      username: dto.username,
    });
  }
}
