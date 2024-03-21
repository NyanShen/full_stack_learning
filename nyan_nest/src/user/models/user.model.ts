import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  userId: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  realName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}