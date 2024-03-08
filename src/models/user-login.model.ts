import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, Length } from "sequelize-typescript";


@Table({
    indexes: [
        {
            name: 'username',
            fields: ['username'],
            unique: true
        },
        {
            name: 'firebaseUID',
            fields: ['firebaseUID'],
            unique: true
        }
    ]
})
export default class UserLogin extends Model {

    @Column({
        allowNull: false,
        comment: 'generated username',
        type: DataType.STRING
    })
    username!: any;

    @Column({ type: DataType.STRING })
    firebaseUID!: string;

    @Column({
        type: DataType.STRING
    })
    deviceId!: string;

    @Column({
        type: DataType.STRING
    })
    deviceOS!: string;

    @Column({
        type: DataType.TEXT
    })
    authToken?: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
