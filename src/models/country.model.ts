import {Model, Column, Table, CreatedAt, UpdatedAt, DataType} from "sequelize-typescript";

@Table
export default class Country extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.DECIMAL })
    phonecode!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
