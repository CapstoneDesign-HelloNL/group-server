import GroupDBManager from "@src/models/GroupDBManager";
import GroupGallery from "@src/models/groupGallery/GroupGalleryModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupGalleryTypes } from "@src/vo/group/controllers/GroupGallery";
import Group from "@src/models/group/GroupModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupGalleryDao extends Dao {
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
    async find(name: string): Promise<GroupGallery | null | undefined> {
        let groupGallery: GroupGallery | null = null;
        console.log(groupGallery);
        try {
            groupGallery = await GroupGallery.findByPk(name);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groupGallery;
    }

    async findAll(): Promise<GroupGallery[] | null | undefined> {
        let groups: GroupGallery[] | null = null;
        console.log(groups);
        try {
            groups = await GroupGallery.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        groupGalleryData: GroupGalleryTypes.GroupGalleryBody
    ): Promise<GroupGallery | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGallery.sync({ force: true });

        let newGroupGallery: GroupGallery | null = null;
        try {
            newGroupGallery = await GroupGallery.create(groupGalleryData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroupGallery;
    }

    async update(
        groupGalleryData: GroupGalleryTypes.GroupGalleryBody,
        afterGroupGalleryData: GroupGalleryTypes.GroupGalleryBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGallery.sync({ force: true });

        let updateGroupGallery: any | null = null;
        try {
            updateGroupGallery = await GroupGallery.update(
                { ...afterGroupGalleryData },
                { where: { ...groupGalleryData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGroupGallery;
    }

    async delete(
        groupGalleryData: GroupGalleryTypes.GroupGalleryBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGallery.sync({ force: true });

        let deleteGalleryGroup: number | null = null;
        try {
            deleteGalleryGroup = await GroupGallery.destroy({
                where: {
                    ...groupGalleryData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGalleryGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupGalleryDao;
