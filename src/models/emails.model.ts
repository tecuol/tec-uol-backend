import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, AfterFind, Sequelize } from "sequelize-typescript";
import EmailStatus from "./emails_read_status.model";
import { createOrUpdate } from "../services/TECUOLLib";

@Table
export default class Emails extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING })
    phone!: string;

    @Column({ type: DataType.STRING })
    email!: string;

    @Column({ type: DataType.TEXT })
    to!: string;

    @Column({ type: DataType.TEXT })
    from!: string;

    @Column({ type: DataType.STRING })
    subject!: string;



    @Column({ type: DataType.TEXT })
    body!: string;

    @Column({ type: DataType.TEXT })
    attachments!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @AfterFind
    static async markReadByUser(result: Emails, user: any) {
        if (user?.id) {
            createOrUpdate({
                data: {
                    emailId: result.id,
                    readUserIds: Sequelize.literal(`CASE WHEN FIND_IN_SET('${user?.id}', readUserIds) = 0 Then CONCAT(readUserIds, ',${user?.id}') ELSE readUserIds END`)
                },
                model: EmailStatus,
                idKey: 'emailId'
            })
        }
    }
}
