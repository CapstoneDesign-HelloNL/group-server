import { Model, Sequelize, Optional } from "sequelize";
import { GroupNoticeModelTypes } from "@src/vo/group/models/GroupNoticeModel";
import { GroupNoticeTypes } from "@src/vo/group/controllers/GroupNotice";

interface GroupNoticeCreationAttributes
    extends Optional<GroupNoticeTypes.GroupNoticeBody, "id"> {}
class GroupNotice
    extends Model<
        GroupNoticeTypes.GroupNoticeBody,
        GroupNoticeCreationAttributes
    >
    implements GroupNoticeTypes.GroupNoticeBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public photo!: string;
    public groupId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupNoticeModelTypes.IBaseGroupNoticeTableOptions = {
            sequelize: connection,
            tableName: "GroupNotice"
        };
        return GroupNotice.init(GroupNoticeModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupAgenda.Group = GroupAgenda.belongsTo(Group);
export default GroupNotice;