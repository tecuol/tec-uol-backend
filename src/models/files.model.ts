import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
@Table
export default class Files extends Model {

    @Column({ type: DataType.STRING })
    src: string;

    @Column({ type: DataType.STRING })
    tags: string;

    @Column({ type: DataType.STRING })
    name: string;
    
    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    type: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

}
