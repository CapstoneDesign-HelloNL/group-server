import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { JoinQuestionModelTypes } from "@src/vo/group/models/JoinQuestionModel";
import { JoinQuestionTypes } from "@src/vo/group/controllers/JoinQuestion";
import Group from "@src/models/group/GroupModel";
import JoinRequest from "@src/models/joinRequest/JoinRequestModel";

class JoinQuestion extends Model implements JoinQuestionTypes.JoinQuestionBody {
    public id!: number;
    public content!: string;
    public order!: number;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroup!: BelongsToCreateAssociationMixin<Group>;
    public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        joinQuestionToGroups: Association<JoinQuestion, Group>;
        joinQuestionToJoinRequests: Association<JoinQuestion, JoinRequest>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: JoinQuestionModelTypes.IBaseJoinQuestionTableOptions = {
            sequelize: connection,
            tableName: "JoinQuestion"
        };
        return JoinQuestion.init(JoinQuestionModelTypes.attr, opt);
    }
}
export default JoinQuestion;
