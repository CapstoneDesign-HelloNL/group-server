import GroupDBManager from "@src/models/GroupDBManager";
import Notice from "@src/models/notice/NoticeModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { NoticeTypes } from "@src/vo/group/controllers/Notice";
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
    async find(id: number): Promise<Notice | null | undefined> {
        let notice: Notice | null = null;
        console.log(notice);
        try {
            notice = await Notice.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return notice;
    }

    async findAll(): Promise<Notice[] | null | undefined> {
        let groups: Notice[] | null = null;
        console.log(groups);
        try {
            groups = await Notice.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        noticeData: NoticeTypes.NoticePostBody
    ): Promise<Notice | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let newNotice: Notice | null = null;
        try {
            newNotice = await Notice.create(noticeData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newNotice;
    }

    async update(
        noticeData: NoticeTypes.NoticePostBody,
        afterNoticeData: NoticeTypes.NoticePostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let updateNotice: any | null = null;
        try {
            updateNotice = await Notice.update(
                { ...afterNoticeData },
                { where: { ...noticeData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateNotice;
    }

    async delete(
        noticeData: NoticeTypes.NoticePostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test") await Notice.sync({ force: true });

        let deleteNoticeGroup: number | null = null;
        try {
            deleteNoticeGroup = await Notice.destroy({
                where: {
                    ...noticeData
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
