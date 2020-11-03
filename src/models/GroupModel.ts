import {
    Model,
    Sequelize,
    Optional,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from "sequelize";
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

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    // public getGroupAgendas!: HasManyGetAssociationsMixin<GroupAgenda>; // Note the null assertions!
    // public addGroupAgenda!: HasManyAddAssociationMixin<GroupAgenda, number>;
    // public hasGroupAgenda!: HasManyHasAssociationMixin<GroupAgenda, number>;
    // public countGroupAgenda!: HasManyCountAssociationsMixin;
    // public createGroupAgenda!: HasManyCreateAssociationMixin<GroupAgenda>;

    // public readonly groupAgenda?: GroupAgenda[];

    // public static associations: {
    //     agendas: Association<Group, GroupAgenda>;
    // };

    static initiate(connection: Sequelize): Model {
        const opt: GroupModelTypes.IBaseGroupTableOptions = {
            sequelize: connection,
            tableName: "Group"
        };
        return Group.init(GroupModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}

export default Group;
