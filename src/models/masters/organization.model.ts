import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";


@Table
export default class Organization extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING })
    discription!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
