import { Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/user/repositories/customer.repository';
import { PrismaService } from '../database/prisma.service';
import { RoleEntity } from 'src/domain/role/entities/role.entity';
import { UserEntity } from 'src/domain/user/entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}
  async create(customer: Partial<UserEntity>): Promise<UserEntity> {
    const data: Prisma.UserUncheckedCreateInput = {
      full_name: customer.full_name!,
      email: customer.email!,
      username: customer.username!,
      password: customer.password!,
      status: customer.status,
      roleId: customer.roleId!,
    };

    return await this.prisma.user.create({ data, include: { role: true } });
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async findRoleId(): Promise<RoleEntity | null> {
    return await this.prisma.role.findFirst({
      where: { status: true, name: 'customer' },
    });
  }
  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }
}
