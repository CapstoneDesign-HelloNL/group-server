import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { GroupScheduleModelTypes } from "@src/vo/group/models/GroupScheduleModel";
import { GroupScheduleTypes } from "@src/vo/group/controllers/GroupSchedule";
import Group from "@src/models/group/GroupModel";

interface GroupScheduleCreationAttributes
    extends Optional<GroupScheduleTypes.GroupScheduleBody, "id"> {}
class GroupSchedule
    extends Model
    // extends Model<
    //     GroupScheduleTypes.GroupScheduleBody,
    //     GroupScheduleCreationAttributes
    // >
    implements GroupScheduleTypes.GroupScheduleBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public startDate!: Date;
    public endDate!: Date;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroupSchedules!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroupSchedule!: BelongsToCreateAssociationMixin<Group>;
    public setGroupSchedule!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        schedulesToGroups: Association<GroupSchedule, Group>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: GroupScheduleModelTypes.IBaseGroupScheduleTableOptions = {
            sequelize: connection,
            tableName: "GroupSchedule"
        };
        return GroupSchedule.init(GroupScheduleModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupSchedule.Group = GroupSchedule.belongsTo(Group);
export default GroupSchedule;
