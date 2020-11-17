import { UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Agenda from "@src/models/agenda/AgendaModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

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

    async findOne({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<Agenda | string | null | undefined> {
        let result: Agenda | null = null;
        try {
            console.log(params);
            result = await Agenda.findOne({
                where: {
                    // id: params.id,
                    // groupName: params.groupName
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    }

    async findAll({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<Agenda[] | string | null | undefined> {
        let result: Agenda[] | null = null;
        try {
            result = await Agenda.findAll({
                order: [["createdAt", "DESC"]],
                where: {
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Agenda | string | undefined> {
        let result: Agenda | null = null;
        try {
            result = await Agenda.create({
                ...params,
                ...data
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let result: unknown | null = null;
        try {
            result = await Agenda.update(
                { ...data },
                {
                    where: {
                        ...params
                    }
                }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            return undefined;
        }
        return result;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | undefined> {
        let deleteAgenda: number | null = null;
        try {
            deleteAgenda = await Agenda.destroy({
                where: {
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteAgenda; //1 is success, 0 or undefined are fail
    }
}

export default AgendaDao;
