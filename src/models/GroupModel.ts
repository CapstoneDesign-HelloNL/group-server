import { Model, Sequelize, Optional } from "sequelize";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";
import { GroupTypes } from "@src/vo/group/controllers/Group";

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
    static initiate(connection: Sequelize): Model {
        const opt: GroupModelTypes.IBaseGroupTableOptions = {
            sequelize: connection,
            tableName: "User"
        };
        return Group.init(GroupModelTypes.attr, opt);
    }
    // static createUser(value: GroupTypes.GroupPostBody) {
    //     return UserModel.create(value);
    // }
}

export default Group;
