import GroupDBManager from "@src/models/GroupDBManager";
import Schedule from "@src/models/schedule/ScheduleModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";
import { UniqueConstraintError, ValidationError } from "sequelize";

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

    async findOne({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<Schedule | string | null | undefined> {
        let result: Schedule | null = null;
        try {
            result = await Schedule.findOne({
                where: { id: params.id, groupName: params.groupName }
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
    }: ParamsStrictReqData): Promise<Schedule[] | string | null | undefined> {
        let result: Schedule[] | null = null;
        try {
            result = await Schedule.findAll({
                where: {
                    groupName: params.groupName
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
    }: AllStrictReqData): Promise<Schedule | string | undefined> {
        let result: Schedule | null = null;
        try {
            result = await Schedule.create({
                groupName: params.groupName,
                ...data
            });
        } catch (err) {
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            logger.error(err);
            return undefined;
        }
        return result;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await Schedule.sync({ force: true });

        let result: unknown | null = null;
        try {
            result = await Schedule.update(
                { ...data },
                {
                    where: { groupName: params.groupName, id: params.id }
                }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    }

    async delete({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<number | string | undefined> {
        if (process.env.NODE_ENV === "test")
            await Schedule.sync({ force: true });

        let result: number | null = null;
        try {
            result = await Schedule.destroy({
                where: {
                    id: params?.id,
                    groupName: params?.groupName
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result; //1 is success, 0 or undefined are fail
    }
}

export default ScheduleDao;
