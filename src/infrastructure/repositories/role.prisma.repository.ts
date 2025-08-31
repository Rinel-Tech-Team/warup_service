import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/domain/role/repositories/role.repository';
import { PrismaService } from '../database/prisma.service';
import { buildPagination, Page } from 'src/domain/common/pagination';
import { RoleEntity } from 'src/domain/role/entities/role.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolePrismaRepository implements RoleRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Partial<RoleEntity>): Promise<RoleEntity> {
    const r = await this.prisma.role.create({
      data: {
        name: data.name!,
        status: data.status!,
        deletedAt: data.deletedAt! || null,
      },
    });
    return r;
  }
  async findByName(name: string): Promise<RoleEntity | null> {
    const r = await this.prisma.role.findUnique({ where: { name } });
    return r ? r : null;
  }
  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
  }): Promise<Page<RoleEntity>> {
    const where: Prisma.RoleWhereInput = {
      deletedAt: null,
      ...(params.search?.trim()
        ? {
            name: {
              contains: params.search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {}),
    };

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.role.count({ where }),
      this.prisma.role.findMany({
        where,
        skip: (params.page - 1) * params.limit,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const data = rows.map((r) => r);

    const meta = buildPagination(params.page, params.limit, total);

    return { data, meta };
  }
  async findById(id: string): Promise<RoleEntity | null> {
    const r = await this.prisma.role.findUnique({ where: { id } });
    return r && !r.deletedAt ? r : null;
  }
  async update(
    id: string,
    data: Partial<RoleEntity>,
  ): Promise<RoleEntity | null> {
    const r = await this.prisma.role.update({ where: { id }, data });
    return r;
  }
  async delete(id: string): Promise<void> {
    await this.prisma.role.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
