import GroupDBManager from "@src/models/GroupDBManager";
import Gallery from "@src/models/gallery/GalleryModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GalleryTypes } from "@src/vo/group/controllers/Gallery";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GalleryDao extends Dao {
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
    async find(name: string): Promise<Gallery | null | undefined> {
        let gallery: Gallery | null = null;
        console.log(gallery);
        try {
            gallery = await Gallery.findByPk(name);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return gallery;
    }

    async findAll(): Promise<Gallery[] | null | undefined> {
        let groups: Gallery[] | null = null;
        console.log(groups);
        try {
            groups = await Gallery.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        galleryData: GalleryTypes.GalleryBody
    ): Promise<Gallery | undefined> {
        if (process.env.NODE_ENV === "test")
            await Gallery.sync({ force: true });

        let newGallery: Gallery | null = null;
        try {
            newGallery = await Gallery.create(galleryData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGallery;
    }

    async update(
        galleryData: GalleryTypes.GalleryBody,
        afterGalleryData: GalleryTypes.GalleryBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await Gallery.sync({ force: true });

        let updateGallery: any | null = null;
        try {
            updateGallery = await Gallery.update(
                { ...afterGalleryData },
                { where: { ...galleryData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGallery;
    }

    async delete(
        galleryData: GalleryTypes.GalleryBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await Gallery.sync({ force: true });

        let deleteGallery: number | null = null;
        try {
            deleteGallery = await Gallery.destroy({
                where: {
                    ...galleryData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGallery; //1 is success, 0 or undefined are fail
    }
}

export default GalleryDao;
