import GroupNotice from "@src/models/groupNotice/GroupNoticeModel";
import GroupNoticeDao from "@src/dao/groupNotice/GroupNoticeDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupNoticeService {
    static findAll = serviceFactory.get<GroupNotice>(
        GroupNoticeDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupNotice>(
        GroupNoticeDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupNotice>(
        GroupNoticeDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupNotice>(
        GroupNoticeDao.getInstance().delete
    );
}

export default GroupNoticeService;
