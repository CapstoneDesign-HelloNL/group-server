import { Model, Sequelize, Optional } from "sequelize";
import { MemberModelTypes } from "@src/vo/group/models/MemberModel";
import { MemberTypes } from "@src/vo/group/controllers/Member";

interface MemberCreationAttributes
    extends Optional<MemberTypes.MemberBody, "id"> {}
class Member
    extends Model<MemberTypes.MemberBody, MemberCreationAttributes>
    implements MemberTypes.MemberBody {
    public id!: number;
    public memberId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    static initiate(connection: Sequelize): Model {
        const opt: MemberModelTypes.IBaseMemberTableOptions = {
            sequelize: connection,
            tableName: "Member"
        };
        return Member.init(MemberModelTypes.attr, opt);
    }
    // static createUser(value: MemberTypes.SignUpPostBody) {
    //     return UserModel.create(value);
    // }
}

export default Member;
