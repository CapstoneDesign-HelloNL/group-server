import { Model, Sequelize, Optional } from "sequelize";
import { GroupGalleryPostPhotoModelTypes } from "@src/vo/group/models/GroupGalleryPostPhotoModel";
import { GroupGalleryPostPhotoTypes } from "@src/vo/group/controllers/GroupGalleryPostPhoto";
import Group from "@src/models/GroupModel";

interface GroupCreationAttributes
    extends Optional<
        GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody,
        "id"
    > {}
class GroupGalleryPostPhoto
    extends Model<
        GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody,
        GroupCreationAttributes
    >
    implements GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody {
    public id!: number;
    public galleryPostPhotoUrl!: string;
    public galleryPostId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupGalleryPostPhotoModelTypes.IBaseGroupGalleryPostPhotoTableOptions = {
            sequelize: connection,
            tableName: "GroupGalleryPostPhoto"
        };
        return GroupGalleryPostPhoto.init(
            GroupGalleryPostPhotoModelTypes.attr,
            opt
        );
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupGalleryPostPhoto.Group = GroupGalleryPostPhoto.belongsTo(Group);
export default GroupGalleryPostPhoto;
