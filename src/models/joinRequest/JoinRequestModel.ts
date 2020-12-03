import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { JoinRequestModelTypes } from "@src/vo/group/models/JoinRequestModel";
import { JoinRequestTypes } from "@src/vo/group/controllers/JoinRequest";
import Group from "@src/models/group/GroupModel";
import JoinQuestion from "@src/models/joinQuestion/JoinQuestionModel";

class JoinRequest extends Model implements JoinRequestTypes.JoinRequestBody {
    public id!: number;
    public author!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroup!: BelongsToCreateAssociationMixin<Group>;
    public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        joinRequestToGroups: Association<JoinRequest, Group>;
        joinRequestToJoinQuestion: Association<JoinRequest, JoinQuestion>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: JoinRequestModelTypes.IBaseJoinRequestTableOptions = {
            sequelize: connection,
            tableName: "JoinRequest"
        };
        return JoinRequest.init(JoinRequestModelTypes.attr, opt);
    }
}
export default JoinRequest;
