import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, } from "sequelize-typescript";
@Table
export default class User extends Model {

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    mobile: string;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING, })
    roleId: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
