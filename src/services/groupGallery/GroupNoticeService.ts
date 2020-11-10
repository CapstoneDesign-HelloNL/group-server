import GroupGallery from "@src/models/groupGallery/GroupGalleryModel";
import GroupGalleryDao from "@src/dao/groupGallery/GroupGalleryDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupNoticeService {
    static findAll = serviceFactory.get<GroupGallery>(
        GroupGalleryDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupGallery>(
        GroupGalleryDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupGallery>(
        GroupGalleryDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupGallery>(
        GroupGalleryDao.getInstance().delete
    );
}

export default GroupNoticeService;
