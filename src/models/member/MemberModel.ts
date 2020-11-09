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
    Association,
    BelongsToManyAddAssociationMixinOptions
} from "sequelize";
import { MemberModelTypes } from "@src/vo/group/models/MemberModel";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import Group from "../group/GroupModel";

interface MemberCreationAttributes
    extends Optional<MemberTypes.MemberBody, "email"> {}
class Member
    extends Model<MemberTypes.MemberBody, MemberCreationAttributes>
    implements MemberTypes.MemberBody {
    public email!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly group?: Group[];

    public static associations: {
        memberToGroup: Association<Member, Group>;
    };

    public getGroups!: BelongsToManyGetAssociationsMixin<Group>; // Note the null assertions!
    public addGroup!: BelongsToManyAddAssociationMixin<Group, string>;
    public addGroups!: BelongsToManyAddAssociationsMixin<Group, string>;
    public hasGroup!: BelongsToManyHasAssociationMixin<Group, string>;
    public hasGroups!: BelongsToManyHasAssociationsMixin<Group, string>;
    public createGroup!: BelongsToManyCreateAssociationMixin<Group>;
    public removeGroup!: BelongsToManyRemoveAssociationMixin<Group, string>;
    public removeGroups!: BelongsToManyRemoveAssociationsMixin<Group, string>;
    public countGroups!: BelongsToManyCountAssociationsMixin;

    static initiate(connection: Sequelize): Model {
        const opt: MemberModelTypes.IBaseMemberTableOptions = {
            sequelize: connection,
            tableName: "Member"
        };
        return Member.init(MemberModelTypes.attr, opt);
    }
}

export default Member;
