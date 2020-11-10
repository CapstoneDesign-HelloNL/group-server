import GalleryPostPhoto from "@src/models/galleryPost/GalleryPostModel";
import GalleryPostPhotoDao from "@src/dao/galleryPostPhoto/GalleryPostPhotoDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GalleryPostPhotoService {
    static findAllByName = serviceFactory.get<GalleryPostPhoto[]>(
        GalleryPostPhotoDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GalleryPostPhoto>(
        GalleryPostPhotoDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GalleryPostPhoto>(
        GalleryPostPhotoDao.getInstance().update
    );

    static delete = serviceFactory.delete<GalleryPostPhoto>(
        GalleryPostPhotoDao.getInstance().delete
    );
}

export default GalleryPostPhotoService;
