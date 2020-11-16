import GalleryPhoto from "@src/models/galleryPhoto/GalleryPhotoModel";
import GalleryPhotoDao from "@src/dao/galleryPostPhoto/GalleryPostPhotoDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GalleryPhotoService {
    static findAllByName = serviceFactory.get<GalleryPhoto[]>(
        GalleryPhotoDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GalleryPhoto>(
        GalleryPhotoDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GalleryPhoto>(
        GalleryPhotoDao.getInstance().update
    );

    static delete = serviceFactory.delete<GalleryPhoto>(
        GalleryPhotoDao.getInstance().delete
    );
}

export default GalleryPhotoService;
