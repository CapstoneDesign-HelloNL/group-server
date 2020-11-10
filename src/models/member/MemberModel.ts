import {
    Model,
    Sequelize,
    Optional,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    Association
} from "sequelize";
import { MemberModelTypes } from "@src/vo/group/models/MemberModel";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import Group from "../group/GroupModel";

interface MemberCreationAttributes
    extends Optional<MemberTypes.MemberBody, "email"> {}
class Member
    extends Model
    // extends Model<MemberTypes.MemberBody, MemberCreationAttributes>
    implements MemberTypes.MemberBody {
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly group?: Group[];

    public static associations: {
        memberToGroup: Association<Member, Group>;
    };

    public getMemberToGroups!: BelongsToManyGetAssociationsMixin<Group>; // Note the null assertions!
    public addMemberToGroup!: BelongsToManyAddAssociationMixin<Group, string>;
    public addMemberToGroups!: BelongsToManyAddAssociationsMixin<Group, string>;
    public hasMemberToGroup!: BelongsToManyHasAssociationMixin<Group, string>;
    public hasMemberToGroups!: BelongsToManyHasAssociationsMixin<Group, string>;
    public createMemberToGroup!: BelongsToManyCreateAssociationMixin<Group>;
    public removeMemberToGroup!: BelongsToManyRemoveAssociationMixin<
        Group,
        string
    >;
    public removeMemberToGroups!: BelongsToManyRemoveAssociationsMixin<
        Group,
        string
    >;
    public countMemberToGroups!: BelongsToManyCountAssociationsMixin;

    static initiate(connection: Sequelize): Model {
        const opt: MemberModelTypes.IBaseMemberTableOptions = {
            sequelize: connection,
            tableName: "Member"
        };
        return Member.init(MemberModelTypes.attr, opt);
    }
}

export default Member;
