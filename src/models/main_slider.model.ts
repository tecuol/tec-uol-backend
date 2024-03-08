import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, } from "sequelize-typescript";
import Files from "./files.model";

@Table
export default class MainSlider extends Model {

    @Column({ type: DataType.TEXT })
    title: string;

    @Column({ type: DataType.INTEGER })
    order_index: number;

    @Column({ type: DataType.TEXT })
    caption: string;

    @ForeignKey(() => Files)
    @Column({ type: DataType.INTEGER })
    imageId: number

    @BelongsTo(() => Files)
    image: Files;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}
