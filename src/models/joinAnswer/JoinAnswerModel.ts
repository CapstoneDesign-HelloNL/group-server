import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { JoinAnswerModelTypes } from "@src/vo/group/models/JoinAnswerModel";
import { JoinAnswerTypes } from "@src/vo/group/controllers/JoinAnswer";
import Group from "@src/models/group/GroupModel";

class JoinAnswer extends Model implements JoinAnswerTypes.JoinAnswerBody {
    public content!: string;
    public author!: string;
    public questionId!: number;
    public requestId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    // public createGroup!: BelongsToCreateAssociationMixin<Group>;
    // public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;
    public static associations: {
        // noticesToGroups: Association<Notice, Group>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: JoinAnswerModelTypes.IBaseJoinAnswerTableOptions = {
            sequelize: connection,
            tableName: "JoinAnswer"
        };
        return JoinAnswer.init(JoinAnswerModelTypes.attr, opt);
    }
}
export default JoinAnswer;
