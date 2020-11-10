import GroupDBManager from "@src/models/GroupDBManager";
import Notice from "@src/models/notice/NoticeModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";
import { UniqueConstraintError, ValidationError } from "sequelize";

const logger = LogService.getInstance();
class NoticeDao extends Dao {
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
    }: ParamsStrictReqData): Promise<Notice | string | null | undefined> {
        let result: Notice | null = null;
        try {
            result = await Notice.findOne({
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
    }: ParamsStrictReqData): Promise<Notice[] | string | null | undefined> {
        let result: Notice[] | null = null;
        try {
            result = await Notice.findAll({
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
    }: AllStrictReqData): Promise<Notice | string | undefined> {
        let result: Notice | null = null;
        try {
            result = await Notice.create({
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
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let result: unknown | null = null;
        try {
            result = await Notice.update(
                { groupName: params?.groupName, ...data, id: params?.id },
                {
                    where: { groupName: params?.groupName, id: params?.id }
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
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let result: number | null = null;
        try {
            result = await Notice.destroy({
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

export default NoticeDao;
