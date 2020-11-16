import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import GalleryPhoto from "@src/models/galleryPhoto/GalleryPhotoModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

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
        let post: GalleryPost | null = null;
        try {
            post = await GalleryPost.findOne({
                where: {
                    id: params.id
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return post;
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
    //                     model: GalleryPost,
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
        GalleryPost[] | string | null | undefined
    > {
        let post: GalleryPost[] | null = null;
        try {
            post = await GalleryPost.findAll({
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
        return post;
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

    //need to modify
    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<GalleryPost | string | null | undefined> {
        const transaction = await this.db?.getConnection().transaction();
        let newPost: [GalleryPost, boolean] | null = null;
        let newPhoto: GalleryPhoto | null = null;
        try {
            newPost = await GalleryPost.findOrCreate({
                ...data,
                transaction
            });
            newPhoto = await GalleryPhoto.findOne({
                where: { id: params.id },
                transaction
            });
            if (newPhoto == null) throw Error;

            await newPost[0].addPostToPhoto(newPhoto, { transaction });
            await newPhoto.addPhotoToPost(newPost[0], { transaction });

            await transaction.commit();
        } catch (err) {
            logger.error(err);
            await transaction.rollback();
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newPost[0];
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateGroup: unknown | null = null;
        try {
            updateGroup = await GalleryPost.update(
                { ...data },
                { where: { id: params.id, galleryName: params.galleryName } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updateGroup;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteGroup: number | null = null;
        try {
            deleteGroup = await GalleryPost.destroy({
                where: {
                    id: params.id,
                    galleryName: params.galleryName
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteGroup;
    }
}

export default GalleryPostDao;
