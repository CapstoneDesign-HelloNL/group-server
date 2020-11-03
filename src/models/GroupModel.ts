import { Model, Sequelize, Optional, Association } from "sequelize";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";
import { GroupTypes } from "@src/vo/group/controllers/Group";
import GroupAgenda from "@src/models/GroupAgendaModel";
interface GroupCreationAttributes
    extends Optional<GroupTypes.GroupBody, "id"> {}
class Group
    extends Model<GroupTypes.GroupBody, GroupCreationAttributes>
    implements GroupTypes.GroupBody {
    public id!: number;
    public name!: string;
    public admin!: string;
    public advisor!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly groupAgenda?: GroupAgenda[];

    public static associations: {
        agendas: Association<Group, GroupAgenda>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: GroupModelTypes.IBaseGroupTableOptions = {
            sequelize: connection,
            tableName: "User"
        };
        return Group.init(GroupModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
Group.hasMany(GroupAgenda, {
    sourceKey: "id",
    foreignKey: "groupId",
    as: "agendas" // this determines the name in `associations`!
});
export default Group;
