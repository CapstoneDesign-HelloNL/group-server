import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Photo from "@src/models/photo/PhotoModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import Post from "@src/models/post/PostModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

const logger = LogService.getInstance();
class PhotoDao extends Dao {
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
    }: AllStrictReqData): Promise<Photo | string | null | undefined> {
        let photo: Photo | null = null;
        try {
            photo = await Photo.findOne({
                where: {
                    id: params.id,
                    postId: params.postId
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return photo;
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
    //                     model: GalleryPhoto,
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
    }: ParamsStrictReqData): Promise<Photo[] | string | null | undefined> {
        let photos: Photo[] | null = null;
        try {
            photos = await Photo.findAll({
                where: {
                    postId: params.postId
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return photos;
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
    }: AllStrictReqData): Promise<Photo | string | null | undefined> {
        const transaction = await GroupDBManager.getInstance().getTransaction();
        let newPhoto: Photo | null = null;
        let newPost: Post | null = null;
        try {
            newPhoto = await Photo.create({
                ...data,
                transaction
            });
            newPost = await Post.findOne({
                where: { id: params.postId },
                transaction
            });
            if (newPost == null) throw Error;

            await transaction.commit();
        } catch (err) {
            logger.error(err);
            await transaction.rollback();
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newPhoto;
    }

    async update({
        data,
        decoded,
        params,
        files
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updatePhoto: unknown | null = null;
        try {
            updatePhoto = await Photo.update(
                { ...data },
                { where: { id: params.id, postId: params.postId } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updatePhoto;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deletePhoto: number | null = null;
        try {
            deletePhoto = await Photo.destroy({
                where: {
                    id: params.id,
                    postId: params.postId
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deletePhoto;
    }
}

export default PhotoDao;
