import { Model, Sequelize, Optional } from "sequelize";
import { GroupAgendaModelTypes } from "@src/vo/group/models/GroupAgendaModel";
import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import Group from "@src/models/GroupModel";
interface GroupCreationAttributes
    extends Optional<GroupAgendaTypes.GroupAgendaBody, "id"> {}
class GroupAgenda
    extends Model<GroupAgendaTypes.GroupAgendaBody, GroupCreationAttributes>
    implements GroupAgendaTypes.GroupAgendaBody {
    public id!: number;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: GroupAgendaModelTypes.IBaseGroupAgendaTableOptions = {
            sequelize: connection,
            tableName: "User"
        };
        return GroupAgenda.init(GroupAgendaModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}

export default GroupAgenda;
