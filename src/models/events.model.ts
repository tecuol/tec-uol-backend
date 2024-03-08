import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, BelongsTo, ForeignKey, HasMany, AfterFind, } from "sequelize-typescript";
import Files from "./files.model";
import EventParticipants from "./event_participants.model";
import EventSchedule from "./event_schedule.model";
import { getAddress } from "../controllers/masters/address.controller";
import { getImages } from "../controllers/file.controller";

@Table({
    hooks: {
        afterFind: (event: Events, options) => {
            Events.parseVenueData(event);
            Events.parseImagesData(event);
            EventSchedule.parseSpeakerData(event);
        },
    },
    indexes: [
        {
            name: 'Title_',
            fields: ['url'],
            unique: true
        },
        {
            name: 'Title',
            fields: ['title'],
            unique: true
        },
    ]
})
export default class Events extends Model {

    @Column({ type: DataType.STRING })
    title!: string;

    @Column({ type: DataType.STRING })
    venueIds!: string;

    @Column({ type: DataType.TEXT })
    short_dis!: string

    @Column({ type: DataType.STRING })
    url!: string;

    @Column({ type: DataType.TEXT })
    event_dic!: string;

    @Column({ type: DataType.TEXT, defaultValue: 'Speakers' })
    speakers_title!: string;

    @Column({ type: DataType.TEXT })
    speakers_dic!: string;

    @HasMany(() => EventParticipants, {
        onDelete: 'CASCADE'
    })
    participants?: EventParticipants;

    @Column({ type: DataType.TEXT })
    event_schedule_dic!: string;

    @HasMany(() => EventSchedule, {
        onDelete: 'CASCADE'
    })
    event_schedule?: EventSchedule;

    @ForeignKey(() => Files)
    @Column({ type: DataType.INTEGER })
    primaryImageId: number

    @BelongsTo(() => Files)
    primaryImage?: Files;

    @Column({ type: DataType.STRING })
    imageIds!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    event_status: number

    @Column({ type: DataType.DATE })
    start_date!: Date;

    @Column({ type: DataType.TIME })
    start_time!: string;

    @Column({ type: DataType.DATE })
    end_date!: Date;

    @Column({ type: DataType.TIME })
    end_time!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @AfterFind
    static async parseVenueData(results: any) {
        if (Array.isArray(results)) {
            await Promise.all(
                results.map(async (result: any) => {
                    const venueIds = result?.venueIds;
                    if (venueIds && typeof venueIds === 'string') {
                        result.venueIds = await getAddress(venueIds);
                    }
                })
            );
        } else {
            const venueIds = results?.venueIds;
            if (venueIds && typeof venueIds === 'string') {
                results.venueIds = await getAddress(venueIds);
            }
        }
    }

    @AfterFind
    static async parseImagesData(results: any) {
        if (Array.isArray(results)) {
            await Promise.all(
                results.map(async (result: any) => {
                    const imageIds = result?.imageIds;
                    if (imageIds && typeof imageIds === 'string') {
                        result.imageIds = await getImages(imageIds);
                    }
                })
            );
        } else {
            const imageIds = results?.imageIds;
            if (imageIds && typeof imageIds === 'string') {
                results.imageIds = await getImages(imageIds);
            }
        }
    }
}
