import { Model, Sequelize, Optional } from "sequelize";
import { GroupGalleryPostModelTypes } from "@src/vo/group/models/GroupGalleryPostModel";
import { GroupGalleryPostTypes } from "@src/vo/group/controllers/GroupGalleryPost";

interface GroupGalleryPostCreationAttributes
    extends Optional<GroupGalleryPostTypes.GroupGalleryPostBody, "id"> {}
class GroupGalleryPost
    extends Model<
        GroupGalleryPostTypes.GroupGalleryPostBody,
        GroupGalleryPostCreationAttributes
    >
    implements GroupGalleryPostTypes.GroupGalleryPostBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public galleryName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupGalleryPostModelTypes.IBaseGroupGalleryPostTableOptions = {
            sequelize: connection,
            tableName: "GroupGalleryPost"
        };
        return GroupGalleryPost.init(GroupGalleryPostModelTypes.attr, opt);
    }
}
export default GroupGalleryPost;
