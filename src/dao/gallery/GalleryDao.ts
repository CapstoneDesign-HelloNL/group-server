import GroupDBManager from "@src/models/GroupDBManager";
import Gallery from "@src/models/gallery/GalleryModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData } from "@src/vo/group/services/reqData";
import { UniqueConstraintError, ValidationError } from "sequelize";
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
    async findOne({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Gallery | string | null | undefined> {
        let gallery: Gallery | null = null;
        try {
            gallery = await Gallery.findOne({
                where: { ...params }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return gallery;
    }

    async findAll({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Gallery[] | string | null | undefined> {
        let groups: Gallery[] | null = null;
        try {
            groups = await Gallery.findAll({
                where: { ...params }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return groups;
    }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Gallery | string | null | undefined> {
        let newGallery: Gallery | null = null;
        try {
            newGallery = await Gallery.create({
                ...data,
                ...params
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newGallery;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | string | null | undefined> {
        let updateGallery: unknown | null = null;
        try {
            updateGallery = await Gallery.update(
                { ...data },
                {
                    where: {
                        ...params
                    }
                }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updateGallery;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteGallery: number | null = null;
        try {
            deleteGallery = await Gallery.destroy({
                where: {
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteGallery; //1 is success, 0 or undefined are fail
    }
}

export default GalleryDao;
