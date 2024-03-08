import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import Organization from "./masters/organization.model";
@Table
export default class Participants extends Model {

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    mobile: string;

    @Column({ type: DataType.STRING })
    email: string;

    @ForeignKey(() => Organization)
    @Column({ type: DataType.INTEGER })
    organizationId: number

    @BelongsTo(() => Organization)
    organization: Organization;

    @Column({ type: DataType.STRING, })
    type: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
