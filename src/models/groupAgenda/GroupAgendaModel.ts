import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { GroupAgendaModelTypes } from "@src/vo/group/models/GroupAgendaModel";
import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import Group from "@src/models/group/GroupModel";

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
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroupAgendas!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroupAgenda!: BelongsToCreateAssociationMixin<Group>;
    public setGroupAgenda!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        agendasToGroups: Association<GroupAgenda, Group>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: GroupAgendaModelTypes.IBaseGroupAgendaTableOptions = {
            sequelize: connection,
            tableName: "GroupAgenda"
        };
        return GroupAgenda.init(GroupAgendaModelTypes.attr, opt);
    }
}
export default GroupAgenda;
