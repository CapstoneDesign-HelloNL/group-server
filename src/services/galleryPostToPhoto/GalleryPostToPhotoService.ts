import GalleryPostToPhoto from "@src/models/galleryPostToPhoto/GalleryPostToPhotoModel";
import GalleryPostToPhotoDao from "@src/dao/galleryPostToPhoto/GalleryPostToPhotoDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GalleryPostToPhotoService {
    static findOne = serviceFactory.get<GalleryPostToPhoto>(
        GalleryPostToPhotoDao.getInstance().findOne
    );
    static findAll = serviceFactory.getMany<GalleryPostToPhoto>(
        GalleryPostToPhotoDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GalleryPostToPhoto>(
        GalleryPostToPhotoDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GalleryPostToPhoto>(
        GalleryPostToPhotoDao.getInstance().update
    );
    static delete = serviceFactory.delete<GalleryPostToPhoto>(
        GalleryPostToPhotoDao.getInstance().delete
    );
}

export default GalleryPostToPhotoService;
