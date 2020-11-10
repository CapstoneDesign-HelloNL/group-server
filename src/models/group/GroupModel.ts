import {
    Model,
    Sequelize,
    Optional,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyHasAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    BelongsToManyRemoveAssociationsMixin,
    BelongsToManyCountAssociationsMixin
} from "sequelize";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";
import { GroupTypes } from "@src/vo/group/controllers/Group";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupSchedule from "@src/models/groupSchedule/GroupScheduleModel";
import GroupNotice from "@src/models/groupNotice/GroupNoticeModel";
import GroupGallery from "../groupGallery/GroupGalleryModel";
import Member from "@src/models/member/MemberModel";

interface GroupCreationAttributes
    extends Optional<GroupTypes.GroupBody, "name"> {}
class Group
    extends Model
    // extends Model<GroupTypes.GroupBody, GroupCreationAttributes>
    implements GroupTypes.GroupBody {
    public name!: string;
    public admin!: string;
    public advisor!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getGroupAgendas!: HasManyGetAssociationsMixin<GroupAgenda>; // Note the null assertions!
    public addGroupAgenda!: HasManyAddAssociationMixin<GroupAgenda, string>;
    public hasGroupAgenda!: HasManyHasAssociationMixin<GroupAgenda, string>;
    public countGroupAgendas!: HasManyCountAssociationsMixin;
    public createGroupAgenda!: HasManyCreateAssociationMixin<GroupAgenda>;

    public getGroupNotices!: HasManyGetAssociationsMixin<GroupNotice>; // Note the null assertions!
    public addGroupNotice!: HasManyAddAssociationMixin<GroupNotice, string>;
    public hasGroupNotice!: HasManyHasAssociationMixin<GroupNotice, string>;
    public countGroupNotices!: HasManyCountAssociationsMixin;
    public createGroupNotice!: HasManyCreateAssociationMixin<GroupNotice>;

    public getGroupSchedules!: HasManyGetAssociationsMixin<GroupSchedule>; // Note the null assertions!
    public addGroupSchedule!: HasManyAddAssociationMixin<GroupSchedule, string>;
    public hasGroupSchedule!: HasManyHasAssociationMixin<GroupSchedule, string>;
    public countGroupSchedules!: HasManyCountAssociationsMixin;
    public createGroupSchedule!: HasManyCreateAssociationMixin<GroupSchedule>;

    public getGroupGallery!: HasManyGetAssociationsMixin<GroupGallery>; // Note the null assertions!
    public addGroupGallery!: HasManyAddAssociationMixin<GroupGallery, string>;
    public hasGroupGallery!: HasManyHasAssociationMixin<GroupGallery, string>;
    public countGroupGalleries!: HasManyCountAssociationsMixin;
    public createGroupGallery!: HasManyCreateAssociationMixin<GroupGallery>;

    public getMembers!: BelongsToManyGetAssociationsMixin<Member>; // Note the null assertions!
    public addMember!: BelongsToManyAddAssociationMixin<Member, string>;
    public addMembers!: BelongsToManyAddAssociationsMixin<Member, string>;
    public hasMember!: BelongsToManyHasAssociationMixin<Member, string>;
    public hasMembers!: BelongsToManyHasAssociationsMixin<Member, string>;
    public createMember!: BelongsToManyCreateAssociationMixin<Member>;
    public removeMember!: BelongsToManyRemoveAssociationMixin<Member, string>;
    public removeMembers!: BelongsToManyRemoveAssociationsMixin<Member, string>;
    public countMembers!: BelongsToManyCountAssociationsMixin;

    public readonly groupAgenda?: GroupAgenda[];
    public readonly groupNotice?: GroupNotice[];
    public readonly groupSchedule?: GroupSchedule[];
    public readonly groupGallery?: GroupGallery[];
    public readonly member?: Member[];

    public static associations: {
        agendas: Association<Group, GroupAgenda>;
        notices: Association<Group, GroupNotice>;
        schedules: Association<Group, GroupSchedule>;
        galleries: Association<Group, GroupGallery>;
        members: Association<Group, Member>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: GroupModelTypes.IBaseGroupTableOptions = {
            sequelize: connection,
            tableName: "Group"
        };
        return Group.init(GroupModelTypes.attr, opt);
    }
}

export default Group;
