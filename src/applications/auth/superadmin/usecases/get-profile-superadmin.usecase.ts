import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../../../domain/user/repositories/admin.repository';
import { SuperadminResponse } from '../../../response/superadmin.response';

@Injectable()
export class GetProfileSuperadminUsecase {
  constructor(private readonly adminRepo: AdminRepository) {}

  async execute(userId: string) {
    const data = await this.adminRepo.getProfile(userId);
    return new SuperadminResponse(data);
  }
}
