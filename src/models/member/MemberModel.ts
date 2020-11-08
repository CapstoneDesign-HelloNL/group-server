import { Model, Sequelize, Optional } from "sequelize";
import { MemberModelTypes } from "@src/vo/group/models/MemberModel";
import { MemberTypes } from "@src/vo/group/controllers/Member";

interface MemberCreationAttributes
    extends Optional<MemberTypes.MemberBody, "email"> {}
class Member
    extends Model<MemberTypes.MemberBody, MemberCreationAttributes>
    implements MemberTypes.MemberBody {
    public email!: string;
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
