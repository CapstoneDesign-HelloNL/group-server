import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { NoticeModelTypes } from "@src/vo/group/models/NoticeModel";
import { NoticeTypes } from "@src/vo/group/controllers/Notice";
import Group from "@src/models/group/GroupModel";

interface NoticeCreationAttributes
    extends Optional<NoticeTypes.NoticeBody, "id"> {}
class GroupNotice
    extends Model
    // extends Model<
    //     GroupNoticeTypes.GroupNoticeBody,
    //     GroupNoticeCreationAttributes
    // >
    implements NoticeTypes.NoticeBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public photo!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getNotices!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createNotice!: BelongsToCreateAssociationMixin<Group>;
    public setNotice!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        noticesToGroups: Association<GroupNotice, Group>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: NoticeModelTypes.IBaseNoticeTableOptions = {
            sequelize: connection,
            tableName: "Notice"
        };
        return GroupNotice.init(NoticeModelTypes.attr, opt);
    }
}
export default GroupNotice;
