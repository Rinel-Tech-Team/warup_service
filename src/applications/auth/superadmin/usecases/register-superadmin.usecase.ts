import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/domain/user/repositories/admin.repository';
import { RegisterSuperadminDTO } from 'src/presentation/auth/superadmin/dto/register-superadmin.dto';
import * as bcrypt from 'bcrypt';
import { SuperadminResponse } from '../../../response/superadmin.response';

@Injectable()
export class RegisterSuperAdminUsecase {
  constructor(
    private readonly adminRepo: AdminRepository,
    // private readonly redis: RedisService,
    // private readonly rabbit: RabbitMQService,
  ) {}

  async execute(dto: RegisterSuperadminDTO) {
    const exist = await this.adminRepo.findByEmail(dto.email);
    if (exist) throw new BadRequestException('Email Already Exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const role = await this.adminRepo.findRoleId(dto.roleId);
    if (!role) {
      throw new BadRequestException('role status is false');
    }

    const superadmin = await this.adminRepo.create({
      full_name: 'Super Admin',
      email: dto.email,
      username: dto.username,
      password: hashed,
      status: true,
      roleId: role?.id,
    });

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // await this.redis.setJson(`otp:${superadmin.id}`, otp, 120);

    // await this.rabbit.publish(process.env.AMQP_EXCHANGE!, 'email.otp', {
    //   to: dto.email,
    //   subject: 'Verifikasi OTP',
    //   text: `Your OTP Code: ${otp}`,
    // });

    return new SuperadminResponse(superadmin);
  }
}
