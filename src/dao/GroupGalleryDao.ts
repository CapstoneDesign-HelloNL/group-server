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
        // GroupGallery.initiate(this.db.getConnection());
        // Group.initiate(this.db.getConnection());

        // const firstSync = async () => {
        //     await Group.sync();
        //     await GroupGallery.sync();
        //     // await this.endConnect();
        // };
        // firstSync();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupGallery | null | undefined> {
        // await this.connect();
        let groupGallery: GroupGallery | null = null;
        console.log(groupGallery);
        try {
            groupGallery = await GroupGallery.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            // await this.endConnect();
            return undefined;
        }
        // // await this.endConnect();
        return groupGallery;
    }

    async findAll(): Promise<GroupGallery[] | null | undefined> {
        // await this.connect();
        let groups: GroupGallery[] | null = null;
        console.log(groups);
        try {
            groups = await GroupGallery.findAll();
        } catch (err) {
            logger.error(err);
            // await this.endConnect();
            return undefined;
        }
        // // await this.endConnect();
        return groups;
    }

    async save(
        groupGalleryData: GroupGalleryTypes.GroupGalleryPostBody
    ): Promise<GroupGallery | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGallery.sync({ force: true });
        // else await Group.sync();

        let newGroupGallery: GroupGallery | null = null;
        try {
            newGroupGallery = await GroupGallery.create(groupGalleryData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return newGroupGallery;
    }

    async update(
        groupGalleryData: GroupGalleryTypes.GroupGalleryPostBody,
        afterGroupGalleryData: GroupGalleryTypes.GroupGalleryPostBody
    ): Promise<any | null | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGallery.sync({ force: true });
        // else await Group.sync();

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
        // // await this.endConnect();
        return updateGroupGallery;
    }

    async delete(
        groupGalleryData: GroupGalleryTypes.GroupGalleryPostBody
    ): Promise<number | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGallery.sync({ force: true });
        // else await Group.sync();

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
        // // await this.endConnect();
        return deleteGalleryGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupGalleryDao;
