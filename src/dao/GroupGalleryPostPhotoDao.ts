import GroupDBManager from "@src/models/GroupDBManager";
import GroupGalleryPostPhoto from "@src/models/groupGalleryPostPhoto/GroupGalleryPostPhotoModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupGalleryPostPhotoTypes } from "@src/vo/group/controllers/GroupGalleryPostPhoto";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupGalleryPostPhotoDao extends Dao {
    private constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupGalleryPostPhoto | null | undefined> {
        let groupGalleryPostPhoto: GroupGalleryPostPhoto | null = null;
        console.log(groupGalleryPostPhoto);
        try {
            groupGalleryPostPhoto = await GroupGalleryPostPhoto.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groupGalleryPostPhoto;
    }

    async findAll(): Promise<GroupGalleryPostPhoto[] | null | undefined> {
        let groups: GroupGalleryPostPhoto[] | null = null;
        console.log(groups);
        try {
            groups = await GroupGalleryPostPhoto.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        groupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody
    ): Promise<GroupGalleryPostPhoto | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPostPhoto.sync({ force: true });

        let newGroupGalleryPostPhoto: GroupGalleryPostPhoto | null = null;
        try {
            newGroupGalleryPostPhoto = await GroupGalleryPostPhoto.create(
                groupGalleryPostPhotoData
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroupGalleryPostPhoto;
    }

    async update(
        groupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody,
        afterGroupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPostPhoto.sync({ force: true });

        let updateGroupGalleryPostPhoto: any | null = null;
        try {
            updateGroupGalleryPostPhoto = await GroupGalleryPostPhoto.update(
                { ...afterGroupGalleryPostPhotoData },
                { where: { ...groupGalleryPostPhotoData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGroupGalleryPostPhoto;
    }

    async delete(
        groupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPostPhoto.sync({ force: true });

        let deleteGalleryPostPhotoGroup: number | null = null;
        try {
            deleteGalleryPostPhotoGroup = await GroupGalleryPostPhoto.destroy({
                where: {
                    ...groupGalleryPostPhotoData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGalleryPostPhotoGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupGalleryPostPhotoDao;
