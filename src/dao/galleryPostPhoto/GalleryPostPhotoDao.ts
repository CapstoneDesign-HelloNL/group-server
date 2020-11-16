import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import GalleryPostPhoto from "@src/models/group/GroupModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

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
    async findOne({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<
        GalleryPostPhoto | string | null | undefined
    > {
        let photo: GalleryPostPhoto | null = null;
        try {
            photo = await GalleryPostPhoto.findOne({
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
    //                     model: GalleryPostPhoto,
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
        GalleryPostPhoto[] | string | null | undefined
    > {
        let photo: GalleryPostPhoto[] | null = null;
        try {
            photo = await GalleryPostPhoto.findAll({
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
    }: AllStrictReqData): Promise<GalleryPostPhoto | string | undefined> {
        const transaction = await this.db?.getConnection().transaction();
        let newPhoto: GalleryPostPhoto | null = null;
        let newPost: GalleryPost | null = null;
        try {
            newPhoto = await GalleryPostPhoto.create(
                { ...data },
                { transaction }
            );
            newPost = await GalleryPost.findOne({
                where: { email: decoded.email },
                transaction
            });

            await newPhoto.addPost(newPost, { transaction });
            await newPost.addMemberToGroup(newPhoto, { transaction });
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newPhoto;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateGroup: unknown | null = null;
        try {
            updateGroup = await GalleryPostPhoto.update(
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
            deleteGroup = await GalleryPostPhoto.destroy({
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

export default GalleryPostPhotoDao;
