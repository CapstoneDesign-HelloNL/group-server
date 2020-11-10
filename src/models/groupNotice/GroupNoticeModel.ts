import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { GroupNoticeModelTypes } from "@src/vo/group/models/GroupNoticeModel";
import { GroupNoticeTypes } from "@src/vo/group/controllers/GroupNotice";
import Group from "@src/models/group/GroupModel";

interface GroupNoticeCreationAttributes
    extends Optional<GroupNoticeTypes.GroupNoticeBody, "id"> {}
class GroupNotice
    extends Model
    // extends Model<
    //     GroupNoticeTypes.GroupNoticeBody,
    //     GroupNoticeCreationAttributes
    // >
    implements GroupNoticeTypes.GroupNoticeBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public photo!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroupNotices!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroupNotice!: BelongsToCreateAssociationMixin<Group>;
    public setGroupNotice!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        noticesToGroups: Association<GroupNotice, Group>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: GroupNoticeModelTypes.IBaseGroupNoticeTableOptions = {
            sequelize: connection,
            tableName: "GroupNotice"
        };
        return GroupNotice.init(GroupNoticeModelTypes.attr, opt);
    }
}
export default GroupNotice;
