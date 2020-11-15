import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { AgendaModelTypes } from "@src/vo/group/models/AgendaModel";
import { AgendaTypes } from "@src/vo/group/controllers/Agenda";
import Group from "@src/models/group/GroupModel";

interface AgendaCreationAttributes
    extends Optional<AgendaTypes.AgendaBody, "id"> {}
class Agenda extends Model implements AgendaTypes.AgendaBody {
    public id!: number;
    public content!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getAgendas!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createAgenda!: BelongsToCreateAssociationMixin<Group>;
    public setAgenda!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        agendasToGroups: Association<Agenda, Group>;
    };

    findOne(opt: any) {
        return Agenda.findOne(opt);
    }
    static initiate(connection: Sequelize): Model {
        const opt: AgendaModelTypes.IBaseAgendaTableOptions = {
            sequelize: connection,
            tableName: "Agenda"
        };
        return Agenda.init(AgendaModelTypes.attr, opt);
    }
}
export default Agenda;
