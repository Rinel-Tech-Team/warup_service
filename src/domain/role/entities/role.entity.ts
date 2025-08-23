export class RoleEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public status: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt: Date,
  ) {}
}
