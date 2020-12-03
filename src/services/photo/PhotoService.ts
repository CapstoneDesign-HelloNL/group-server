import Photo from "@src/models/photo/PhotoModel";
import PhotoDao from "@src/dao/photo/PhotoDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class PhotoService {
    static findOne = serviceFactory.get<Photo>(PhotoDao.getInstance().findOne);
    static findAll = serviceFactory.getMany<Photo>(
        PhotoDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Photo>(
        PhotoDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Photo>(
        PhotoDao.getInstance().update
    );

    static delete = serviceFactory.delete<Photo>(PhotoDao.getInstance().delete);
}

export default PhotoService;
