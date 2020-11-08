import GroupDBManager from "@src/models/GroupDBManager";
import GroupNotice from "@src/models/groupNotice/GroupNoticeModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupNoticeTypes } from "@src/vo/group/controllers/GroupNotice";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupNoticeDao extends Dao {
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
    async find(id: number): Promise<GroupNotice | null | undefined> {
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
            return undefined;
        }
        return groupNotice;
    }

    async findAll(): Promise<GroupNotice[] | null | undefined> {
        let groups: GroupNotice[] | null = null;
        console.log(groups);
        try {
            groups = await GroupNotice.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        groupNoticeData: GroupNoticeTypes.GroupNoticePostBody
    ): Promise<GroupNotice | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupNotice.sync({ force: true });

        let newGroupNotice: GroupNotice | null = null;
        try {
            newGroupNotice = await GroupNotice.create(groupNoticeData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroupNotice;
    }

    async update(
        groupNoticeData: GroupNoticeTypes.GroupNoticePostBody,
        afterGroupNoticeData: GroupNoticeTypes.GroupNoticePostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupNotice.sync({ force: true });

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
        return updateGroupNotice;
    }

    async delete(
        groupNoticeData: GroupNoticeTypes.GroupNoticePostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupNotice.sync({ force: true });

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
        return deleteNoticeGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupNoticeDao;
