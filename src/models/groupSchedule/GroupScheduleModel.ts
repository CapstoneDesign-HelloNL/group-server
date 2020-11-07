import { Model, Sequelize, Optional } from "sequelize";
import { GroupScheduleModelTypes } from "@src/vo/group/models/GroupScheduleModel";
import { GroupScheduleTypes } from "@src/vo/group/controllers/GroupSchedule";

interface GroupScheduleCreationAttributes
    extends Optional<GroupScheduleTypes.GroupScheduleBody, "id"> {}
class GroupSchedule
    extends Model<
        GroupScheduleTypes.GroupScheduleBody,
        GroupScheduleCreationAttributes
    >
    implements GroupScheduleTypes.GroupScheduleBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public startDate!: Date;
    public endDate!: Date;
    public groupId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

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
