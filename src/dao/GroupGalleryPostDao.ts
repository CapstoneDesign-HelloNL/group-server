import GroupDBManager from "@src/models/GroupDBManager";
import GroupGalleryPost from "@src/models/groupGalleryPost/GroupGalleryPostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupGalleryPostTypes } from "@src/vo/group/controllers/GroupGalleryPost";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupGalleryPostDao extends Dao {
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
    async find(id: number): Promise<GroupGalleryPost | null | undefined> {
        let groupGalleryPost: GroupGalleryPost | null = null;
        console.log(groupGalleryPost);
        try {
            groupGalleryPost = await GroupGalleryPost.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groupGalleryPost;
    }

    async findAll(): Promise<GroupGalleryPost[] | null | undefined> {
        let groups: GroupGalleryPost[] | null = null;
        console.log(groups);
        try {
            groups = await GroupGalleryPost.findAll();
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save(
        groupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody
    ): Promise<GroupGalleryPost | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPost.sync({ force: true });

        let newGroupGalleryPost: GroupGalleryPost | null = null;
        try {
            newGroupGalleryPost = await GroupGalleryPost.create(
                groupGalleryPostData
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroupGalleryPost;
    }

    async update(
        groupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody,
        afterGroupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody
    ): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPost.sync({ force: true });

        let updateGroupGalleryPost: any | null = null;
        try {
            updateGroupGalleryPost = await GroupGalleryPost.update(
                { ...afterGroupGalleryPostData },
                { where: { ...groupGalleryPostData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGroupGalleryPost;
    }

    async delete(
        groupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody
    ): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPost.sync({ force: true });

        let deleteGalleryPostGroup: number | null = null;
        try {
            deleteGalleryPostGroup = await GroupGalleryPost.destroy({
                where: {
                    ...groupGalleryPostData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGalleryPostGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupGalleryPostDao;
