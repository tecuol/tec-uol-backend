import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Country from "./country.model";

@Table
export default class State extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING })
    code!: string;

    @ForeignKey(() => Country)
    @Column({ type: DataType.INTEGER })
    countryId: number

    @BelongsTo(() => Country)
    country?: Country;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
