import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import GalleryPostToPhoto from "@src/models/galleryPostToPhoto/GalleryPostToPhotoModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

const logger = LogService.getInstance();
class GalleryPostToPhotoDao extends Dao {
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
    }: AllStrictReqData): Promise<
        GalleryPostToPhoto | string | null | undefined
    > {
        let postToPhoto: GalleryPostToPhoto | null = null;
        try {
            postToPhoto = await GalleryPostToPhoto.findOne({
                where: {
                    id: params.id
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return postToPhoto;
    }

    // async findSignUp({
    //     decoded
    // }: ParamsStrictReqData): Promise<Member | string | null | undefined> {
    //     let member: Member | null = null;
    //     try {
    //         member = await Member.findOne({
    //             where: {
    //                 email: decoded?.email
    //             },
    //             include: [
    //                 {
    //                     model: GalleryPostToPhoto,
    //                     as: "memberToGroup",
    //                     attributes: ["name"]
    //                 }
    //             ]
    //         });
    //     } catch (err) {
    //         logger.error(err);
    //         if (err instanceof ValidationError) return `BadRequest`;
    //         return undefined;
    //     }
    //     return member;
    // }

    async findAll({
        //gallery post와 엮여있는 모든 postPhoto를 가져오기
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<
        GalleryPostToPhoto[] | string | null | undefined
    > {
        let postToPhoto: GalleryPostToPhoto[] | null = null;
        try {
            postToPhoto = await GalleryPostToPhoto.findAll({
                where: {
                    name: {
                        [Op.like]: `%${params?.groupName}%`
                    }
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return postToPhoto;
    }

    // async findAll({
    //     data,
    //     decoded,
    //     params
    // }: ParamsStrictReqData): Promise<Group[] | string | null | undefined> {
    //     let groups: Group[] | null = null;
    //     try {
    //         groups = await Group.findAll({
    //             where: {
    //                 name: params.groupName
    //             },
    //             include: Member
    //         });
    //     } catch (err) {
    //         logger.error(err);
    //         if (err instanceof ValidationError) return `BadRequest`;
    //         return undefined;
    //     }
    //     return groups;
    // }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<
        GalleryPostToPhoto | string | null | undefined
    > {
        let newPostToPhoto: GalleryPostToPhoto | null = null;
        try {
            newPostToPhoto = await GalleryPostToPhoto.create({
                galleryPostId: params.galleryPostId,
                galleryPhotoId: params.galleryPhotoId
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newPostToPhoto;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updatePostToPhoto: unknown | null = null;
        try {
            updatePostToPhoto = await GalleryPostToPhoto.update(
                { ...data },
                { where: { galleryPhotoId: data.galleryPhotoId } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updatePostToPhoto;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deletePostToPhoto: number | null = null;
        try {
            deletePostToPhoto = await GalleryPostToPhoto.destroy({
                where: {
                    galleryPostId: params.postId,
                    galleryPhotoId: params.photoId
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deletePostToPhoto;
    }
}

export default GalleryPostToPhotoDao;
