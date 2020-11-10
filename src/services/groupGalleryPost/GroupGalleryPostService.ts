import GroupGalleryPost from "@src/models/groupGalleryPost/GroupGalleryPostModel";
import GroupGalleryPostDao from "@src/dao/groupGalleryPost/GroupGalleryPostDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupGalleryPostService {
    static findAllByName = serviceFactory.get<GroupGalleryPost[]>(
        GroupGalleryPostDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupGalleryPost>(
        GroupGalleryPostDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupGalleryPost>(
        GroupGalleryPostDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupGalleryPost>(
        GroupGalleryPostDao.getInstance().delete
    );
}

export default GroupGalleryPostService;
