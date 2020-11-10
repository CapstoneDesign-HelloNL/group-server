import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { ScheduleModelTypes } from "@src/vo/group/models/ScheduleModel";
import { ScheduleTypes } from "@src/vo/group/controllers/Schedule";
import Group from "@src/models/group/GroupModel";

interface ScheduleCreationAttributes
    extends Optional<ScheduleTypes.ScheduleBody, "id"> {}
class GroupSchedule
    extends Model
    // extends Model<
    //     GroupScheduleTypes.GroupScheduleBody,
    //     GroupScheduleCreationAttributes
    // >
    implements ScheduleTypes.ScheduleBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public startDate!: Date;
    public endDate!: Date;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getSchedules!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createSchedule!: BelongsToCreateAssociationMixin<Group>;
    public setSchedule!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        schedulesToGroups: Association<GroupSchedule, Group>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: ScheduleModelTypes.IBaseScheduleTableOptions = {
            sequelize: connection,
            tableName: "Schedule"
        };
        return GroupSchedule.init(ScheduleModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupSchedule.Group = GroupSchedule.belongsTo(Group);
export default GroupSchedule;
