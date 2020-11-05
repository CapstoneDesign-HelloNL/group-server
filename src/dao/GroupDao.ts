import GroupDBManager from "@src/models/GroupDBManager";
import Group from "@src/models/GroupModel";
import GroupAgenda from "@src/models/GroupAgendaModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupTypes } from "@src/vo/group/controllers/Group";

const logger = LogService.getInstance();
class GroupDao extends Dao {
    private constructor() {
        super();
    }
    protected async connect() {
        this.db = new GroupDBManager();
        Group.initiate(this.db.getConnection());
        GroupAgenda.initiate(this.db.getConnection());

        Group.hasMany(GroupAgenda, {
            sourceKey: "id",
            foreignKey: "groupId",
            as: "agendas" // this determines the name in `associations`!
        });

        await Group.sync();
        await GroupAgenda.sync();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(name: string): Promise<Group | null | undefined> {
        await this.connect();
        let group: Group | null = null;
        console.log(group);
        try {
            group = await Group.findOne({
                where: {
                    name
                }
            });
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return group;
    }

    async findAll(name: string): Promise<Group[] | null | undefined> {
        await this.connect();
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
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groups;
    }

    async save(
        groupData: GroupTypes.GroupPostBody
    ): Promise<Group | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });
        // else await Group.sync();

        let newGroup: Group | null = null;
        try {
            newGroup = await Group.create(groupData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return newGroup;
    }

    async update(
        groupData: GroupTypes.GroupPostBody,
        afterGroupData: GroupTypes.GroupPostBody
    ): Promise<any | null | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });
        // else await Group.sync();

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
        await this.endConnect();
        return updateGroup;
    }

    async delete(
        groupData: GroupTypes.GroupPostBody
    ): Promise<number | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });
        // else await Group.sync();

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
        await this.endConnect();
        return deleteGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupDao;
