import { Model, Sequelize, Optional } from "sequelize";
import { GroupToMemberModelTypes } from "@src/vo/group/models/GroupToMemberModel";
import { GroupToMemberTypes } from "@src/vo/group/controllers/GroupToMember";

// interface MemberCreationAttributes
//     extends Optional<GroupToMemberTypes.GroupToMemberBody, "id"> {}

class GroupToMember
    extends Model
    // extends Model<
    //     GroupToMemberTypes.GroupToMemberBody,
    //     MemberCreationAttributes
    // >
    implements GroupToMemberTypes.GroupToMemberBody {
    // public id!: number;
    public groupName!: string;
    public memberEmail!: string;
    public memberRank!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: GroupToMemberModelTypes.IBaseGroupToMemberTableOptions = {
            sequelize: connection,
            tableName: "GroupToMember"
        };
        return GroupToMember.init(GroupToMemberModelTypes.attr, opt);
    }
}

export default GroupToMember;
