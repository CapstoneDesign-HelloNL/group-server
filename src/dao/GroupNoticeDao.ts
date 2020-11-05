import GroupDBManager from "@src/models/GroupDBManager";
import GroupNotice from "@src/models/GroupNoticeModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupNoticeTypes } from "@src/vo/group/controllers/GroupNotice";
import Group from "@src/models/GroupModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupNoticeDao extends Dao {
    private constructor() {
        super();
    }
    protected async connect() {
        this.db = new GroupDBManager();
        GroupNotice.initiate(this.db.getConnection());
        Group.initiate(this.db.getConnection());
        await Group.sync();
        await GroupNotice.sync();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupNotice | null | undefined> {
        await this.connect();
        let groupNotice: GroupNotice | null = null;
        console.log(groupNotice);
        try {
            groupNotice = await GroupNotice.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groupNotice;
    }

    async findAll(): Promise<GroupNotice[] | null | undefined> {
        await this.connect();
        let groups: GroupNotice[] | null = null;
        console.log(groups);
        try {
            groups = await GroupNotice.findAll();
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groups;
    }

    async save(
        groupNoticeData: GroupNoticeTypes.GroupNoticePostBody
    ): Promise<GroupNotice | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupNotice.sync({ force: true });
        // else await Group.sync();

        let newGroupNotice: GroupNotice | null = null;
        try {
            newGroupNotice = await GroupNotice.create(groupNoticeData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return newGroupNotice;
    }

    async update(
        groupNoticeData: GroupNoticeTypes.GroupNoticePostBody,
        afterGroupNoticeData: GroupNoticeTypes.GroupNoticePostBody
    ): Promise<any | null | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupNotice.sync({ force: true });
        // else await Group.sync();

        let updateGroupNotice: any | null = null;
        try {
            updateGroupNotice = await GroupNotice.update(
                { ...afterGroupNoticeData },
                { where: { ...groupNoticeData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return updateGroupNotice;
    }

    async delete(
        groupNoticeData: GroupNoticeTypes.GroupNoticePostBody
    ): Promise<number | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupNotice.sync({ force: true });
        // else await Group.sync();

        let deleteNoticeGroup: number | null = null;
        try {
            deleteNoticeGroup = await GroupNotice.destroy({
                where: {
                    ...groupNoticeData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return deleteNoticeGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupNoticeDao;
