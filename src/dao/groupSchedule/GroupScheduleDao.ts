import GroupDBManager from "@src/models/GroupDBManager";
import GroupSchedule from "@src/models/groupSchedule/GroupScheduleModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupScheduleTypes } from "@src/vo/group/controllers/GroupSchedule";
import Group from "@src/models/group/GroupModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupScheduleDao extends Dao {
    private constructor() {
        super();

        this.db = GroupDBManager.getInstance();
        // GroupSchedule.initiate(this.db.getConnection());
        // Group.initiate(this.db.getConnection());

        // GroupSchedule.belongsTo(Group, {
        //     targetKey: "groupId",
        //     foreignKey: "id"
        // });

        // const firstSync = async () => {
        //     await Group.sync();
        //     await GroupSchedule.sync();
        //     // await this.endConnect();
        // };
        // firstSync();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupSchedule | null | undefined> {
        // await this.connect();
        let groupSchedule: GroupSchedule | null = null;
        console.log(groupSchedule);
        try {
            groupSchedule = await GroupSchedule.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            // await this.endConnect();
            return undefined;
        }
        // // await this.endConnect();
        return groupSchedule;
    }

    async findAll(): Promise<GroupSchedule[] | null | undefined> {
        // await this.connect();
        let groups: GroupSchedule[] | null = null;
        console.log(groups);
        try {
            groups = await GroupSchedule.findAll();
        } catch (err) {
            logger.error(err);
            // await this.endConnect();
            return undefined;
        }
        // // await this.endConnect();
        return groups;
    }

    async save(
        groupScheduleData: GroupScheduleTypes.GroupSchedulePostBody
    ): Promise<GroupSchedule | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupSchedule.sync({ force: true });
        // else await Group.sync();

        let newGroupSchedule: GroupSchedule | null = null;
        try {
            newGroupSchedule = await GroupSchedule.create(groupScheduleData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return newGroupSchedule;
    }

    async update(
        groupScheduleData: GroupScheduleTypes.GroupSchedulePostBody,
        afterGroupScheduleData: GroupScheduleTypes.GroupSchedulePostBody
    ): Promise<any | null | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupSchedule.sync({ force: true });
        // else await Group.sync();

        let updateGroupSchedule: any | null = null;
        try {
            updateGroupSchedule = await GroupSchedule.update(
                { ...afterGroupScheduleData },
                { where: { ...groupScheduleData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return updateGroupSchedule;
    }

    async delete(
        groupScheduleData: GroupScheduleTypes.GroupSchedulePostBody
    ): Promise<number | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupSchedule.sync({ force: true });
        // else await Group.sync();

        let deleteScheduleGroup: number | null = null;
        try {
            deleteScheduleGroup = await GroupSchedule.destroy({
                where: {
                    ...groupScheduleData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return deleteScheduleGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupScheduleDao;
