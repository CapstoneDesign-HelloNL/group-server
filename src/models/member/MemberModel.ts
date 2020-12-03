import { Model, Sequelize } from "sequelize";
import { MemberModelTypes } from "@src/vo/group/models/MemberModel";
import { MemberTypes } from "@src/vo/group/controllers/Member";
class Member extends Model implements MemberTypes.MemberBody {
    public groupName!: string;
    public memberEmail!: string;
    public memberRank!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: MemberModelTypes.IBaseMemberTableOptions = {
            sequelize: connection,
            tableName: "Member"
        };
        return Member.init(MemberModelTypes.attr, opt);
    }
}

export default Member;
