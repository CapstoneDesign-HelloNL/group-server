import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPhoto from "@src/models/galleryPhoto/GalleryPhotoModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

const logger = LogService.getInstance();
class GalleryPhotoDao extends Dao {
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
    }: AllStrictReqData): Promise<GalleryPhoto | string | null | undefined> {
        let photo: GalleryPhoto | null = null;
        try {
            photo = await GalleryPhoto.findOne({
                where: {
                    id: params.id
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
    }: ParamsStrictReqData): Promise<
        GalleryPhoto[] | string | null | undefined
    > {
        let photo: GalleryPhoto[] | null = null;
        try {
            photo = await GalleryPhoto.findAll({
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
        return photo;
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
    }: AllStrictReqData): Promise<GalleryPhoto | string | null | undefined> {
        const transaction = await GroupDBManager.getInstance().getTransaction();
        // const transaction = await this.db?.getConnection().transaction();
        let newPhoto: [GalleryPhoto, boolean] | null = null;
        let newPost: GalleryPost | null = null;
        try {
            newPhoto = await GalleryPhoto.findOrCreate({
                ...data,
                transaction
            });
            newPost = await GalleryPost.findOne({
                where: { id: params.id },
                transaction
            });
            if (newPost == null) throw Error;

            await newPhoto[0].addPhotoToPost(newPost, { transaction });
            await newPost.addPostToPhoto(newPhoto[0], { transaction });

            await transaction.commit();
        } catch (err) {
            logger.error(err);
            await transaction.rollback();
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newPhoto[0];
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateGroup: unknown | null = null;
        try {
            updateGroup = await GalleryPhoto.update(
                { ...data },
                { where: { name: params.groupName } }
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
            deleteGroup = await GalleryPhoto.destroy({
                where: {
                    name: params.groupName
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

export default GalleryPhotoDao;
