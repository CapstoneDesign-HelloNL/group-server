import {
    Model,
    Sequelize,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { AgendaModelTypes } from "@src/vo/group/models/AgendaModel";
import { AgendaTypes } from "@src/vo/group/controllers/Agenda";
import Group from "@src/models/group/GroupModel";

class Agenda extends Model implements AgendaTypes.AgendaBody {
    public id!: number;
    public content!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroup!: BelongsToCreateAssociationMixin<Group>;
    public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        agendasToGroup: Association<Agenda, Group>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: AgendaModelTypes.IBaseAgendaTableOptions = {
            sequelize: connection,
            tableName: "Agenda"
        };
        return Agenda.init(AgendaModelTypes.attr, opt);
    }
}
export default Agenda;
