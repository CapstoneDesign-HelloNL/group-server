import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPostPhoto from "@src/models/galleryPostPhoto/GalleryPostPhotoModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GalleryPostPhotoTypes } from "@src/vo/group/controllers/GalleryPostPhoto";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GalleryPostPhotoDao extends Dao {
    private constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GalleryPostPhoto | null | undefined> {
        let galleryPostPhoto: GalleryPostPhoto | null = null;
        console.log(galleryPostPhoto);
        try {
            galleryPostPhoto = await GalleryPostPhoto.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return galleryPostPhoto;
    }

    async findAll(): Promise<GalleryPostPhoto[] | null | undefined> {
        let groups: GalleryPostPhoto[] | null = null;
        console.log(groups);
        try {
            groups = await GalleryPostPhoto.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        galleryPostPhotoData: GalleryPostPhotoTypes.GalleryPostPhotoPostBody
    ): Promise<GalleryPostPhoto | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPostPhoto.sync({ force: true });

        let newGalleryPostPhoto: GalleryPostPhoto | null = null;
        try {
            newGalleryPostPhoto = await GalleryPostPhoto.create(
                galleryPostPhotoData
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGalleryPostPhoto;
    }

    async update(
        galleryPostPhotoData: GalleryPostPhotoTypes.GalleryPostPhotoPostBody,
        afterGalleryPostPhotoData: GalleryPostPhotoTypes.GalleryPostPhotoPostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPostPhoto.sync({ force: true });

        let updateGalleryPostPhoto: any | null = null;
        try {
            updateGalleryPostPhoto = await GalleryPostPhoto.update(
                { ...afterGalleryPostPhotoData },
                { where: { ...galleryPostPhotoData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGalleryPostPhoto;
    }

    async delete(
        galleryPostPhotoData: GalleryPostPhotoTypes.GalleryPostPhotoPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPostPhoto.sync({ force: true });

        let deleteGalleryPostPhoto: number | null = null;
        try {
            deleteGalleryPostPhoto = await GalleryPostPhoto.destroy({
                where: {
                    ...galleryPostPhotoData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGalleryPostPhoto; //1 is success, 0 or undefined are fail
    }
}

export default GalleryPostPhotoDao;
