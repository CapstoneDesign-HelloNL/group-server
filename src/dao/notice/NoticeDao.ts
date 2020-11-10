import GroupDBManager from "@src/models/GroupDBManager";
import Notice from "@src/models/notice/NoticeModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { StrictReqData } from "@src/vo/group/services/reqData";
import { UniqueConstraintError, ValidationError } from "sequelize";
/*
update, delete logic need to change
*/
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
        decoded
    }: StrictReqData): Promise<Notice | string | null | undefined> {
        let result: Notice | null = null;
        try {
            result = await Notice.findByPk(data.id);
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return result;
    }

    async findAllByGroup({
        data,
        decoded,
        params
    }: StrictReqData): Promise<Notice[] | null | undefined> {
        let result: Notice[] | null = null;
        try {
            result = await Notice.findAll({
                where: {
                    groupName: params?.groupName
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return result;
    }

    async save({
        data,
        decoded
    }: StrictReqData): Promise<Notice | string | undefined> {
        let result: Notice | null = null;
        try {
            result = await Notice.create(data);
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
        decoded
    }: StrictReqData): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let result: any | null = null;
        try {
            result = await Notice.update(
                { ...data },
                {
                    where: { id: data.id }
                }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return result;
    }

    async delete({
        data,
        decoded
    }: StrictReqData): Promise<number | string | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let result: number | null = null;
        try {
            result = await Notice.destroy({
                where: {
                    ...data
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
