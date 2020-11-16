import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GalleryPostTypes } from "@src/vo/group/controllers/GalleryPost";
import { AllStrictReqData } from "@src/vo/group/services/reqData";
import { ValidationError } from "sequelize";

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
    async findOne({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<GalleryPost | string | null | undefined> {
        let galleryPost: GalleryPost | null = null;
        try {
            galleryPost = await GalleryPost.findOne({
                where: { id: params.id }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return galleryPost;
    }

    async findAll({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<GalleryPost[] | string | null | undefined> {
        let groups: GalleryPost[] | null = null;
        try {
            groups = await GalleryPost.findAll({
                where: {
                    groupName: params.galleryName
                }
            });
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
