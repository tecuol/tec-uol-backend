import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Country from "./country.model";
import State from "./state.model";

@Table
export default class City extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING })
    code!: string;

    @ForeignKey(() => State)
    @Column({ type: DataType.INTEGER })
    stateId: number

    @BelongsTo(() => State)
    state?: State;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
