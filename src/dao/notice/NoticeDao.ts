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
        decoded
    }: StrictReqData): Promise<Notice[] | string | null | undefined> {
        let result: Notice[] | null = null;
        try {
            result = await Notice.findAll({
                where: {
                    groupName: data.groupName
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
        decoded
    }: StrictReqData): Promise<Notice | string | undefined> {
        let newNotice: Notice | null = null;
        try {
            newNotice = await Notice.create(data);
        } catch (err) {
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            logger.error(err);
            return undefined;
        }
        return newNotice;
    }

    async update({
        data,
        decoded
    }: StrictReqData): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let updateNotice: any | null = null;
        try {
            updateNotice = await Notice.update(data.afterNoticeData, {
                where: { ...data.noticeData }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateNotice;
    }

    async delete({
        data,
        decoded
    }: StrictReqData): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let deleteNoticeGroup: number | null = null;
        try {
            deleteNoticeGroup = await Notice.destroy({
                where: {
                    ...data.noticeData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteNoticeGroup; //1 is success, 0 or undefined are fail
    }
}

export default NoticeDao;
