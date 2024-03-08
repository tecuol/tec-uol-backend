import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, } from "sequelize-typescript";
import Files from "./files.model";
import Participants from "./participants.model";
import Events from "./events.model";
import ParticipantType from "./masters/participant_type.model";
import Address from "./masters/address.model";
import Organization from "./masters/organization.model";

@Table
export default class EventParticipants extends Model {

    @Column({ type: DataType.TEXT })
    topic: string

    @ForeignKey(() => Participants)
    @Column({ type: DataType.INTEGER })
    participantId: number

    @BelongsTo(() => Participants)
    participant?: Participants;

    @ForeignKey(() => Events)
    @Column({ type: DataType.INTEGER })
    eventId: number

    @ForeignKey(() => ParticipantType)
    @Column({ type: DataType.INTEGER })
    attendAsId: number

    @BelongsTo(() => ParticipantType)
    attendAs?: ParticipantType;

    @ForeignKey(() => Address)
    @Column({ type: DataType.INTEGER })
    attendVenuId: number

    @BelongsTo(() => Address)
    attendVenu?: Address;

    @ForeignKey(() => Organization)
    @Column({ type: DataType.INTEGER })
    organizationId: number

    @BelongsTo(() => Organization)
    organization?: Organization;

    @Column({ type: DataType.INTEGER })
    typeId: number

    @Column({ type: DataType.TEXT })
    attachmentsIds: string

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
