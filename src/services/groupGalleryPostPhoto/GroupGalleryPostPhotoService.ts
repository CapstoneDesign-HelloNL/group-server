import GroupGalleryPostPhoto from "@src/models/groupGalleryPost/GroupGalleryPostModel";
import GroupGalleryPostPhotoDao from "@src/dao/groupGalleryPostPhoto/GroupGalleryPostPhotoDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupGalleryPostPhotoService {
    static findAllByName = serviceFactory.get<GroupGalleryPostPhoto[]>(
        GroupGalleryPostPhotoDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupGalleryPostPhoto>(
        GroupGalleryPostPhotoDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupGalleryPostPhoto>(
        GroupGalleryPostPhotoDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupGalleryPostPhoto>(
        GroupGalleryPostPhotoDao.getInstance().delete
    );
}

export default GroupGalleryPostPhotoService;
