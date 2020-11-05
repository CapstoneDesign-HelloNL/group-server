import GroupDBManager from "@src/models/GroupDBManager";
import GroupGalleryPostPhoto from "@src/models/GroupGalleryPostPhotoModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupGalleryPostPhotoTypes } from "@src/vo/group/controllers/GroupGalleryPostPhoto";
import Group from "@src/models/GroupModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupGalleryPostPhotoDao extends Dao {
    private constructor() {
        super();
    }
    protected async connect() {
        this.db = new GroupDBManager();
        GroupGalleryPostPhoto.initiate(this.db.getConnection());
        Group.initiate(this.db.getConnection());
        await Group.sync();
        await GroupGalleryPostPhoto.sync();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupGalleryPostPhoto | null | undefined> {
        await this.connect();
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
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groupGalleryPostPhoto;
    }

    async findAll(): Promise<GroupGalleryPostPhoto[] | null | undefined> {
        await this.connect();
        let groups: GroupGalleryPostPhoto[] | null = null;
        console.log(groups);
        try {
            groups = await GroupGalleryPostPhoto.findAll();
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groups;
    }

    async save(
        groupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody
    ): Promise<GroupGalleryPostPhoto | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPostPhoto.sync({ force: true });
        // else await Group.sync();

        let newGroupGalleryPostPhoto: GroupGalleryPostPhoto | null = null;
        try {
            newGroupGalleryPostPhoto = await GroupGalleryPostPhoto.create(
                groupGalleryPostPhotoData
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return newGroupGalleryPostPhoto;
    }

    async update(
        groupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody,
        afterGroupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody
    ): Promise<any | null | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPostPhoto.sync({ force: true });
        // else await Group.sync();

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
        await this.endConnect();
        return updateGroupGalleryPostPhoto;
    }

    async delete(
        groupGalleryPostPhotoData: GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoPostBody
    ): Promise<number | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPostPhoto.sync({ force: true });
        // else await Group.sync();

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
        await this.endConnect();
        return deleteGalleryPostPhotoGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupGalleryPostPhotoDao;
