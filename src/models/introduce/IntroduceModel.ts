import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { IntroduceModelTypes } from "@src/vo/group/models/IntroduceModel";
import { IntroduceTypes } from "@src/vo/group/controllers/Introduce";
import Group from "@src/models/group/GroupModel";

interface IntroduceCreationAttributes
    extends Optional<IntroduceTypes.IntroduceBody, "id"> {}
class Introduce
    extends Model
    // extends Model<
    //     GroupNoticeTypes.GroupNoticeBody,
    //     GroupNoticeCreationAttributes
    // >
    implements IntroduceTypes.IntroduceBody {
    public id!: number;
    public content!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    // public createGroup!: BelongsToCreateAssociationMixin<Group>;
    // public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        introduceToGroups: Association<Introduce, Group>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: IntroduceModelTypes.IBaseIntroduceTableOptions = {
            sequelize: connection,
            tableName: "Introduce"
        };
        return Introduce.init(IntroduceModelTypes.attr, opt);
    }
}
export default Introduce;
