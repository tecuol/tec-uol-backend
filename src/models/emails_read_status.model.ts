import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Emails from "./emails.model";

@Table
export default class EmailStatus extends Model {

    @ForeignKey(() => Emails)
    @Column({ type: DataType.INTEGER })
    emailId: number

    @BelongsTo(() => Emails)
    email?: Emails;

    @Column({ type: DataType.STRING })
    readUserIds: number

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
