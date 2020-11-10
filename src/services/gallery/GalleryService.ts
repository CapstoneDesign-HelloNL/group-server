import Gallery from "@src/models/gallery/GalleryModel";
import GalleryDao from "@src/dao/gallery/GalleryDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GalleryService {
    static findAll = serviceFactory.get<Gallery>(
        GalleryDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Gallery>(
        GalleryDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Gallery>(
        GalleryDao.getInstance().update
    );

    static delete = serviceFactory.delete<Gallery>(
        GalleryDao.getInstance().delete
    );
}

export default GalleryService;
