import { Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/domain/user/repositories/admin.repository';
import { PrismaService } from '../database/prisma.service';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { Prisma } from '@prisma/client';
import { RoleEntity } from 'src/domain/role/entities/role.entity';

@Injectable()
export class AdminPrismaRepository implements AdminRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const data: Prisma.UserUncheckedCreateInput = {
      full_name: user.full_name!,
      email: user.email!,
      username: user.username!,
      password: user.password!,
      status: user.status,
      roleId: user.roleId!,
    };

    return await this.prisma.user.create({ data, include: { role: true } });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async getProfile(id: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }
  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findRoleId(roleId: string): Promise<RoleEntity | null> {
    return await this.prisma.role.findFirst({
      where: { id: roleId, status: true },
    });
  }
}
