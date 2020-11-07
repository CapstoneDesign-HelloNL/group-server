import { Model, Sequelize, Optional } from "sequelize";
import { GroupGalleryModelTypes } from "@src/vo/group/models/GroupGalleryModel";
import { GroupGalleryTypes } from "@src/vo/group/controllers/GroupGallery";

interface GroupGalleryCreationAttributes
    extends Optional<GroupGalleryTypes.GroupGalleryBody, "id"> {}
class GroupGallery
    extends Model<
        GroupGalleryTypes.GroupGalleryBody,
        GroupGalleryCreationAttributes
    >
    implements GroupGalleryTypes.GroupGalleryBody {
    public id!: number;
    public title!: string;
    public groupId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupGalleryModelTypes.IBaseGroupGalleryTableOptions = {
            sequelize: connection,
            tableName: "GroupGallery"
        };
        return GroupGallery.init(GroupGalleryModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupAgenda.Group = GroupAgenda.belongsTo(Group);
export default GroupGallery;
