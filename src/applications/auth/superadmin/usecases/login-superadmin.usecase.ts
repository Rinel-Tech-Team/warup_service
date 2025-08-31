import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from 'src/domain/user/repositories/admin.repository';
import { LoginSuperadminDTO } from 'src/presentation/auth/superadmin/dto/login-superadmin.dto';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/infrastructure/cache/redis.service';

@Injectable()
export class LoginSuperadminUsecase {
  constructor(
    private readonly adminRepo: AdminRepository,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
  ) {}

  async execute(dto: LoginSuperadminDTO) {
    const superadmin = await this.adminRepo.findByEmail(dto.email);
    if (!superadmin) throw new UnauthorizedException('User tidak ditemukan');
    if (!superadmin.status)
      throw new UnauthorizedException('Account not verified');

    const match = await bcrypt.compare(dto.password, superadmin.password);
    if (!match) throw new UnauthorizedException('Password incorrect');

    const payload = {
      sub: superadmin.id,
      email: superadmin.email,
      username: superadmin.username,
    };

    const token_data = this.jwt.sign(payload);

    await this.redis.setJson(
      `token:${payload.sub}`,
      { userId: superadmin.id, token: token_data },
      60 * 60 * 24 * 7,
    );

    return {
      accessToken: token_data,
    };
  }
}
