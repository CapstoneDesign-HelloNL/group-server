import GroupDBManager from "@src/models/GroupDBManager";
import GroupGalleryPost from "@src/models/groupGalleryPost/GroupGalleryPostModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupGalleryPostTypes } from "@src/vo/group/controllers/GroupGalleryPost";
import GroupGallery from "@src/models/groupGallery/GroupGalleryModel";
import GroupGalleryPostToPhoto from "@src/models/groupGalleryPostToPhoto/GroupGalleryPostToPhotoModel";
import GroupGalleryPostPhoto from "@src/models/groupGalleryPostPhoto/GroupGalleryPostPhotoModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class GroupGalleryPostDao extends Dao {
    private constructor() {
        super();
        this.db = new GroupDBManager();
        GroupGalleryPost.initiate(this.db.getConnection());
        GroupGallery.initiate(this.db.getConnection());
        GroupGalleryPostPhoto.initiate(this.db.getConnection());
        GroupGalleryPostToPhoto.initiate(this.db.getConnection());

        GroupGalleryPost.belongsToMany(GroupGalleryPostPhoto, {
            through: "GroupGalleryPostToPhoto"
        });

        GroupGalleryPostPhoto.belongsToMany(GroupGalleryPost, {
            through: "GroupGalleryPostToPhoto"
        });

        const firstSync = async () => {
            await GroupGallery.sync();
            await GroupGalleryPost.sync();
            await GroupGalleryPostPhoto.sync();
            await GroupGalleryPostToPhoto.sync();
            await this.endConnect();
        };
        firstSync();
    }
    protected async connect() {
        this.db = new GroupDBManager();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<GroupGalleryPost | null | undefined> {
        await this.connect();
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
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groupGalleryPost;
    }

    async findAll(): Promise<GroupGalleryPost[] | null | undefined> {
        await this.connect();
        let groups: GroupGalleryPost[] | null = null;
        console.log(groups);
        try {
            groups = await GroupGalleryPost.findAll();
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groups;
    }

    async save(
        groupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody
    ): Promise<GroupGalleryPost | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPost.sync({ force: true });
        // else await Group.sync();

        let newGroupGalleryPost: GroupGalleryPost | null = null;
        try {
            newGroupGalleryPost = await GroupGalleryPost.create(
                groupGalleryPostData
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return newGroupGalleryPost;
    }

    async update(
        groupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody,
        afterGroupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody
    ): Promise<any | null | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPost.sync({ force: true });
        // else await Group.sync();

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
        await this.endConnect();
        return updateGroupGalleryPost;
    }

    async delete(
        groupGalleryPostData: GroupGalleryPostTypes.GroupGalleryPostPostBody
    ): Promise<number | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test")
            await GroupGalleryPost.sync({ force: true });
        // else await Group.sync();

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
        await this.endConnect();
        return deleteGalleryPostGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupGalleryPostDao;
