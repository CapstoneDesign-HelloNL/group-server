import GroupDBManager from "@src/models/GroupDBManager";
import Schedule from "@src/models/schedule/ScheduleModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { ScheduleTypes } from "@src/vo/group/controllers/Schedule";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class ScheduleDao extends Dao {
    private constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<Schedule | null | undefined> {
        let schedule: Schedule | null = null;
        console.log(schedule);
        try {
            schedule = await Schedule.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return schedule;
    }

    async findAll(): Promise<Schedule[] | null | undefined> {
        let groups: Schedule[] | null = null;
        console.log(groups);
        try {
            groups = await Schedule.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        scheduleData: ScheduleTypes.SchedulePostBody
    ): Promise<Schedule | undefined> {
        if (process.env.NODE_ENV === "test")
            await Schedule.sync({ force: true });

        let newSchedule: Schedule | null = null;
        try {
            newSchedule = await Schedule.create(scheduleData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newSchedule;
    }

    async update(
        scheduleData: ScheduleTypes.SchedulePostBody,
        afterScheduleData: ScheduleTypes.SchedulePostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await Schedule.sync({ force: true });

        let updateSchedule: any | null = null;
        try {
            updateSchedule = await Schedule.update(
                { ...afterScheduleData },
                { where: { ...scheduleData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateSchedule;
    }

    async delete(
        scheduleData: ScheduleTypes.SchedulePostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await Schedule.sync({ force: true });

        let deleteSchedule: number | null = null;
        try {
            deleteSchedule = await Schedule.destroy({
                where: {
                    ...scheduleData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteSchedule; //1 is success, 0 or undefined are fail
    }
}

export default ScheduleDao;
