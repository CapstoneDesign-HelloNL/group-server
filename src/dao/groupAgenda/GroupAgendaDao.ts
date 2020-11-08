import GroupDBManager from "@src/models/GroupDBManager";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupAgendaDao extends Dao {
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
    async find(id: number): Promise<GroupAgenda | null | undefined> {
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
            return undefined;
        }
        return groupAgenda;
    }

    async findAll(): Promise<GroupAgenda[] | null | undefined> {
        let groups: GroupAgenda[] | null = null;
        console.log(groups);
        try {
            groups = await GroupAgenda.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        groupAgendaData: GroupAgendaTypes.GroupAgendaPostBody
    ): Promise<GroupAgenda | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupAgenda.sync({ force: true });

        let newGroupAgenda: GroupAgenda | null = null;
        try {
            newGroupAgenda = await GroupAgenda.create(groupAgendaData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroupAgenda;
    }

    async update(
        groupAgendaData: GroupAgendaTypes.GroupAgendaPostBody,
        afterGroupAgendaData: GroupAgendaTypes.GroupAgendaPostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupAgenda.sync({ force: true });

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
        return updateGroupAgenda;
    }

    async delete(
        groupAgendaData: GroupAgendaTypes.GroupAgendaPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupAgenda.sync({ force: true });
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
        return deleteAgendaGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupAgendaDao;
