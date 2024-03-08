import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, AfterFind, } from "sequelize-typescript";
import Events from "./events.model";
import { getParticipants } from "../controllers/participant.controller";

@Table({
    hooks: {
        afterFind: (event: Events) => {
            console.log({ "asasasa": event })
            EventSchedule.parseSpeakerData(event);
        },
    }
})

export default class EventSchedule extends Model {

    @Column({ type: DataType.STRING })
    title!: string;

    @Column({ type: DataType.STRING })
    discription!: string;

    @Column({ type: DataType.TEXT })
    speakerIds: string

    @ForeignKey(() => Events)
    @Column({ type: DataType.INTEGER })
    eventId: number

    @Column({ type: DataType.STRING })
    day!: string;

    @Column({ type: DataType.STRING })
    day_no!: string;

    @Column({ type: DataType.TIME })
    start_time!: string;

    @Column({ type: DataType.TIME })
    end_time!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @AfterFind
    static async parseSpeakerData(results: any) {
        let data = results
        //check if result have speakerIds key

        if (!results?.hasOwnProperty('speakerIds')) {
            data = results.event_schedule
        }
        if (Array.isArray(data)) {
            await Promise.all(
                data.map(async (result: any) => {
                    const speakerIds = result?.speakerIds;
                    if (speakerIds && typeof speakerIds === 'string') {
                        result.speakerIds = await getParticipants(speakerIds);
                    }
                })
            );
        } else {
            const speakerIds = data?.speakerIds;
            if (speakerIds && typeof speakerIds === 'string') {
                data.speakerIds = await getParticipants(speakerIds);
            }
        }
    }
}
