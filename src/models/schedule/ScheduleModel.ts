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
class Schedule
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

    public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroup!: BelongsToCreateAssociationMixin<Group>;
    public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        schedulesToGroups: Association<Schedule, Group>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: ScheduleModelTypes.IBaseScheduleTableOptions = {
            sequelize: connection,
            tableName: "Schedule"
        };
        return Schedule.init(ScheduleModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupSchedule.Group = GroupSchedule.belongsTo(Group);
export default Schedule;
