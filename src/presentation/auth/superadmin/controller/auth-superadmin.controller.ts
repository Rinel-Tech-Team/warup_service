import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetProfileSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/get-profile-superadmin.usecase';
import { LoginSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/login-superadmin.usecase';
import { RegisterSuperAdminUsecase } from 'src/applications/auth/superadmin/usecases/register-superadmin.usecase';
import { UpdateSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/update-superadmin.usecase';
import { RegisterSuperadminDTO } from '../dto/register-superadmin.dto';
import { LoginSuperadminDTO } from '../dto/login-superadmin.dto';
import { JwtAuthGuard } from '../../jwt-auth.guard';
import { UpdateSuperadminDTO } from '../dto/update-superadmin.dto';
import { LogoutSuperadminUsecase } from 'src/applications/auth/superadmin/usecases/logout-superadmin.usecase';

@Controller('superadmin')
export class SuperadminController {
  constructor(
    private readonly registerUC: RegisterSuperAdminUsecase,
    private readonly loginUC: LoginSuperadminUsecase,
    private readonly getProfile: GetProfileSuperadminUsecase,
    private readonly updateUC: UpdateSuperadminUsecase,
    private readonly logoutUC: LogoutSuperadminUsecase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerSuperadmin(@Body() dto: RegisterSuperadminDTO) {
    const superadmin = await this.registerUC.execute(dto);
    return { data: superadmin, message: 'user created' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginSuperadmin(@Body() dto: LoginSuperadminDTO) {
    const token = await this.loginUC.execute(dto);
    return { data: token, message: 'login successfully' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfileSuperadmin(@Req() req) {
    const profile = await this.getProfile.execute(req.user.userId);
    return { data: profile, message: 'get profile success' };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfileSuperadmin(@Req() req, @Body() dto: UpdateSuperadminDTO) {
    const updated = await this.updateUC.execute(req.user.userId, dto);
    return { data: updated, message: 'update profile success' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logoutSuperadmin(@Req() req) {
    return await this.logoutUC.execute(req.user.userId);
  }
}
