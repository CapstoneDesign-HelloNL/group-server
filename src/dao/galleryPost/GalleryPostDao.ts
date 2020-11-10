import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GalleryPostTypes } from "@src/vo/group/controllers/GalleryPost";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GalleryPostDao extends Dao {
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
    async find(id: number): Promise<GalleryPost | null | undefined> {
        let galleryPost: GalleryPost | null = null;
        console.log(galleryPost);
        try {
            galleryPost = await GalleryPost.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return galleryPost;
    }

    async findAll(): Promise<GalleryPost[] | null | undefined> {
        let groups: GalleryPost[] | null = null;
        console.log(groups);
        try {
            groups = await GalleryPost.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        galleryPostData: GalleryPostTypes.GalleryPostPostBody
    ): Promise<GalleryPost | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPost.sync({ force: true });

        let newGalleryPost: GalleryPost | null = null;
        try {
            newGalleryPost = await GalleryPost.create(galleryPostData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGalleryPost;
    }

    async update(
        galleryPostData: GalleryPostTypes.GalleryPostPostBody,
        afterGalleryPostData: GalleryPostTypes.GalleryPostPostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPost.sync({ force: true });

        let updateGalleryPost: any | null = null;
        try {
            updateGalleryPost = await GalleryPost.update(
                { ...afterGalleryPostData },
                { where: { ...galleryPostData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGalleryPost;
    }

    async delete(
        galleryPostData: GalleryPostTypes.GalleryPostPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GalleryPost.sync({ force: true });

        let deleteGalleryPost: number | null = null;
        try {
            deleteGalleryPost = await GalleryPost.destroy({
                where: {
                    ...galleryPostData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGalleryPost; //1 is success, 0 or undefined are fail
    }
}

export default GalleryPostDao;
