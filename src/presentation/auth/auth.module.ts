import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminRepository } from 'src/domain/user/repositories/admin.repository';
import { AdminPrismaRepository } from '../../infrastructure/repositories/admin.prisma.repository';
import { RegisterSuperAdminUsecase } from 'src/applications/auth/superadmin/usecases/register-superadmin.usecase';
import { LoginSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/login-superadmin.usecase';
import { GetProfileSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/get-profile-superadmin.usecase';
import { UpdateSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/update-superadmin.usecase';
import { LogoutSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/logout-superadmin.usecase';
import { JwtStrategy } from './jwt.strategy';
import { SuperadminController } from './superadmin/controller/auth-superadmin.controller';
import { CustomerController } from './customer/controller/auth-customer.controller';
import { CustomerRepository } from 'src/domain/user/repositories/customer.repository';
import { CustomerPrismaRepository } from 'src/infrastructure/repositories/customer.prisma.repository';
import { RegisterCustomerUsecase } from 'src/applications/auth/customer/usecases/register-customer.usecase';
import { EmailConsumer } from './customer/consumer/email.consumer';
import { VerifyOTPUsecase } from 'src/applications/auth/customer/usecases/verify-otp.usecase';
import { ResendcodeOTPUsecase } from 'src/applications/auth/customer/usecases/resendcode-otp.usecase';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SuperadminController, CustomerController],
  providers: [
    { provide: AdminRepository, useClass: AdminPrismaRepository },
    RegisterSuperAdminUsecase,
    LoginSuperadminUsecase,
    GetProfileSuperadminUsecase,
    UpdateSuperadminUsecase,
    LogoutSuperadminUsecase,
    JwtStrategy,
    { provide: CustomerRepository, useClass: CustomerPrismaRepository },
    RegisterCustomerUsecase,
    EmailConsumer,
    VerifyOTPUsecase,
    ResendcodeOTPUsecase,
  ],
})
export class AuthModule {}
