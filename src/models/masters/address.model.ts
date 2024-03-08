import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import City from "../city.model";
import Country from "../country.model";
import State from "../state.model";

@Table
export default class Address extends Model {

    @Column({ type: DataType.STRING })
    area: string;

    @Column({ type: DataType.STRING })
    landmark: string;

    @Column({ type: DataType.STRING })
    pincode!: string;

    @ForeignKey(() => State)
    @Column({ type: DataType.INTEGER })
    stateId: number

    @BelongsTo(() => State)
    state?: State;

    @ForeignKey(() => City)
    @Column({ type: DataType.INTEGER })
    cityId: number

    @BelongsTo(() => City)
    city?: City;

    @Column({ type: DataType.STRING })
    full_address: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
