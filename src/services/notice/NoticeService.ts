import Notice from "@src/models/notice/NoticeModel";
import NoticeDao from "@src/dao/notice/NoticeDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class NoticeService {
    static findOne = serviceFactory.get<Notice>(
        NoticeDao.getInstance().findOne
    );
    static findAll = serviceFactory.getMany<Notice>(
        NoticeDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Notice>(
        NoticeDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Notice>(
        NoticeDao.getInstance().update
    );

    static delete = serviceFactory.delete<Notice>(
        NoticeDao.getInstance().delete
    );
}

export default NoticeService;
