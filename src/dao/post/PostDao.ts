import Express from "express";
import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Post from "@src/models/post/PostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import Photo from "@src/models/photo/PhotoModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

const logger = LogService.getInstance();
class PostDao extends Dao {
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
    }: AllStrictReqData): Promise<Post | string | null | undefined> {
        let post: Post | null = null;
        try {
            post = await Post.findOne({
                where: {
                    id: params.postId,
                    galleryName: params.galleryName,
                    groupName: params.groupName
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
    }: ParamsStrictReqData): Promise<Post[] | string | null | undefined> {
        let post: Post[] | null = null;
        try {
            post = await Post.findAll({
                where: {
                    galleryName: params.galleryName,
                    groupName: params.groupName
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
        params,
        files
    }: AllStrictReqData): Promise<Post | string | null | undefined> {
        const transaction = await GroupDBManager.getInstance().getTransaction();
        let newPost: Post | null = null;
        let newPhoto: Photo | null = null;
        try {
            newPost = await Post.create({
                ...data,
                ...params,
                transaction
            });
            console.log(files);
            for (let file in files) {
                newPhoto = await Photo.create({
                    galleryPhotoUrl: files[file].location,
                    postId: newPost.id,
                    transaction
                });
                // if (newPhoto == null) throw Error;

                // await newPost.addPostToPhoto(newPhoto, { transaction });
                // await newPhoto.addPhotoToPost(newPost, { transaction });
            }

            await transaction.commit();
        } catch (err) {
            logger.error(err);
            await transaction.rollback();
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newPost;
    }

    async update({
        data,
        decoded,
        params,
        files
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateGroup: unknown | null = null;
        let existPhotos: Photo[] | null = null;
        try {
            updateGroup = await Post.update(
                { ...data },
                {
                    where: {
                        id: params.postId,
                        galleryName: params.galleryName,
                        groupName: params.groupName
                    }
                }
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
            deleteGroup = await Post.destroy({
                where: {
                    id: params.postId,
                    galleryName: params.galleryName,
                    groupName: params.groupName
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

export default PostDao;
