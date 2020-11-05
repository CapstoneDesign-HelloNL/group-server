import { Model, Sequelize, Optional } from "sequelize";
import { GroupAgendaModelTypes } from "@src/vo/group/models/GroupAgendaModel";
import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import Group from "@src/models/GroupModel";

interface GroupAgendaCreationAttributes
    extends Optional<GroupAgendaTypes.GroupAgendaBody, "id"> {}
class GroupAgenda
    extends Model<
        GroupAgendaTypes.GroupAgendaBody,
        GroupAgendaCreationAttributes
    >
    implements GroupAgendaTypes.GroupAgendaBody {
    public id!: number;
    public content!: string;
    public groupId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupAgendaModelTypes.IBaseGroupAgendaTableOptions = {
            sequelize: connection,
            tableName: "GroupAgenda"
        };
        return GroupAgenda.init(GroupAgendaModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}
// GroupAgenda.Group = GroupAgenda.belongsTo(Group);
export default GroupAgenda;
