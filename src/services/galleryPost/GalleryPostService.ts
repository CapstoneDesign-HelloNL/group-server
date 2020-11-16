import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import GalleryPostDao from "@src/dao/galleryPost/GalleryPostDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GalleryPostService {
    static findOne = serviceFactory.get<GalleryPost>(
        GalleryPostDao.getInstance().findOne
    );
    static findAll = serviceFactory.get<GalleryPost[]>(
        GalleryPostDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GalleryPost>(
        GalleryPostDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GalleryPost>(
        GalleryPostDao.getInstance().update
    );
    static delete = serviceFactory.delete<GalleryPost>(
        GalleryPostDao.getInstance().delete
    );
}

export default GalleryPostService;
