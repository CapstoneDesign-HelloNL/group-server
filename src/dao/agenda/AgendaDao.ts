import { UniqueConstraintError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Agenda from "@src/models/agenda/AgendaModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AgendaTypes } from "@src/vo/group/controllers/Agenda";
import {
    ParamsStrictReqData,
    ReqData,
    StrictReqData
} from "@src/vo/group/services/reqData";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class AgendaDao extends Dao {
    protected constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<Agenda | null | undefined> {
        let result: Agenda | null = null;
        try {
            result = await Agenda.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return result;
    }

    async findAll({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<Agenda[] | null | undefined> {
        let result: Agenda[] | null = null;
        try {
            result = await Agenda.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    groupName: params.groupName
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return result;
    }

    async save({ data, decoded }: StrictReqData): Promise<Agenda | undefined> {
        if (process.env.NODE_ENV === "test") await Agenda.sync({ force: true });

        let result: Agenda | null = null;
        try {
            result = await Agenda.create({ ...data });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return result;
    }

    async update(
        agendaData: AgendaTypes.AgendaPostBody,
        afterAgendaData: AgendaTypes.AgendaPostBody
    ): Promise<unknown | null | undefined> {
        if (process.env.NODE_ENV === "test") await Agenda.sync({ force: true });

        let result: unknown | null = null;
        try {
            result = await Agenda.update(
                { ...afterAgendaData },
                { where: { ...agendaData } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            return undefined;
        }
        return result;
    }

    async delete(
        agendaData: AgendaTypes.AgendaPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test") await Agenda.sync({ force: true });
        let deleteAgenda: number | null = null;
        try {
            deleteAgenda = await Agenda.destroy({
                where: {
                    ...agendaData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteAgenda; //1 is success, 0 or undefined are fail
    }
}

export default AgendaDao;
