import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPhoto from "@src/models/galleryPhoto/GalleryPhotoModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GalleryPhotoTypes } from "@src/vo/group/controllers/GalleryPostPhoto";

const logger = LogService.getInstance();
class GalleryPostPhotoDao extends Dao {
    protected constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GalleryPhoto | null | undefined> {
        let galleryPostPhoto: GalleryPhoto | null = null;
        console.log(galleryPostPhoto);
        try {
            galleryPostPhoto = await GalleryPhoto.findOne({
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

    async findAll(): Promise<GalleryPhoto[] | null | undefined> {
        let groups: GalleryPhoto[] | null = null;
        console.log(groups);
        try {
            groups = await GalleryPhoto.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        galleryPostPhotoData: GalleryPhotoTypes.GalleryPhotoPostBody
    ): Promise<GalleryPhoto | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPhoto.sync({ force: true });

        let newGalleryPostPhoto: GalleryPhoto | null = null;
        try {
            newGalleryPostPhoto = await GalleryPhoto.create(
                galleryPostPhotoData
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGalleryPostPhoto;
    }

    async update(
        galleryPostPhotoData: GalleryPhotoTypes.GalleryPhotoPostBody,
        afterGalleryPostPhotoData: GalleryPhotoTypes.GalleryPhotoPostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPhoto.sync({ force: true });

        let updateGalleryPostPhoto: any | null = null;
        try {
            updateGalleryPostPhoto = await GalleryPhoto.update(
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
        galleryPostPhotoData: GalleryPhotoTypes.GalleryPhotoPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPhoto.sync({ force: true });

        let deleteGalleryPostPhoto: number | null = null;
        try {
            deleteGalleryPostPhoto = await GalleryPhoto.destroy({
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
