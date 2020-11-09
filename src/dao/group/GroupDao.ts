import GroupDBManager from "@src/models/GroupDBManager";
import Group from "@src/models/group/GroupModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupTypes } from "@src/vo/group/controllers/Group";

const logger = LogService.getInstance();
class GroupDao extends Dao {
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
    async find(name: string, email: string): Promise<Group | null | undefined> {
        let group: Group | null = null;
        try {
            group = await Group.findOne({
                where: {
                    name
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return group;
    }

    async findAll(name: string): Promise<Group[] | null | undefined> {
        let groups: Group[] | null = null;
        console.log(groups);
        try {
            groups = await Group.findAll({
                where: {
                    name
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(groupData: GroupTypes.GroupBody): Promise<Group | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let newGroup: Group | null = null;
        try {
            newGroup = await Group.create(groupData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroup;
    }

    async update(
        groupData: GroupTypes.GroupBody,
        afterGroupData: GroupTypes.GroupBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let updateGroup: any | null = null;
        try {
            updateGroup = await Group.update(
                { ...afterGroupData },
                { where: { ...groupData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGroup;
    }

    async delete(groupData: GroupTypes.GroupBody): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let deleteGroup: number | null = null;
        try {
            deleteGroup = await Group.destroy({
                where: {
                    ...groupData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupDao;
