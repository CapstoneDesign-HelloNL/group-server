import GroupDBManager from "@src/models/GroupDBManager";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import Group from "@src/models/group/GroupModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupAgendaDao extends Dao {
    private constructor() {
        super();
        this.db = new GroupDBManager();
        GroupAgenda.initiate(this.db.getConnection());
        Group.initiate(this.db.getConnection());

        const firstSync = async () => {
            await Group.sync();
            await GroupAgenda.sync();
            await this.endConnect();
        };
        firstSync();
    }
    protected async connect() {
        this.db = new GroupDBManager();
        GroupAgenda.initiate(this.db.getConnection());
        Group.initiate(this.db.getConnection());
        await Group.sync();
        await GroupAgenda.sync();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupAgenda | null | undefined> {
        await this.connect();
        let groupAgenda: GroupAgenda | null = null;
        console.log(groupAgenda);
        try {
            groupAgenda = await GroupAgenda.findOne({
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
        return groupAgenda;
    }

    async findAll(): Promise<GroupAgenda[] | null | undefined> {
        await this.connect();
        let groups: GroupAgenda[] | null = null;
        console.log(groups);
        try {
            groups = await GroupAgenda.findAll();
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groups;
    }

    async save(
        groupAgendaData: GroupAgendaTypes.GroupAgendaPostBody
    ): Promise<GroupAgenda | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupAgenda.sync({ force: true });
        // else await Group.sync();

        let newGroupAgenda: GroupAgenda | null = null;
        try {
            newGroupAgenda = await GroupAgenda.create(groupAgendaData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return newGroupAgenda;
    }

    async update(
        groupAgendaData: GroupAgendaTypes.GroupAgendaPostBody,
        afterGroupAgendaData: GroupAgendaTypes.GroupAgendaPostBody
    ): Promise<any | null | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupAgenda.sync({ force: true });
        // else await Group.sync();

        let updateGroupAgenda: any | null = null;
        try {
            updateGroupAgenda = await GroupAgenda.update(
                { ...afterGroupAgendaData },
                { where: { ...groupAgendaData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return updateGroupAgenda;
    }

    async delete(
        groupAgendaData: GroupAgendaTypes.GroupAgendaPostBody
    ): Promise<number | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupAgenda.sync({ force: true });
        // else await Group.sync();

        let deleteAgendaGroup: number | null = null;
        try {
            deleteAgendaGroup = await GroupAgenda.destroy({
                where: {
                    ...groupAgendaData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return deleteAgendaGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupAgendaDao;
