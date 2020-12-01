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
import Agenda from "@src/models/agenda/AgendaModel";
import Schedule from "@src/models/schedule/ScheduleModel";
import Notice from "@src/models/notice/NoticeModel";
import Gallery from "@src/models/gallery/GalleryModel";
// import Member from "@src/models/member/MemberModel";
import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";

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
    public getAgendas!: HasManyGetAssociationsMixin<Agenda>; // Note the null assertions!
    public addAgenda!: HasManyAddAssociationMixin<Agenda, string>;
    public hasAgenda!: HasManyHasAssociationMixin<Agenda, string>;
    public countAgendas!: HasManyCountAssociationsMixin;
    public createAgenda!: HasManyCreateAssociationMixin<Agenda>;

    public getNotices!: HasManyGetAssociationsMixin<Notice>; // Note the null assertions!
    public addNotice!: HasManyAddAssociationMixin<Notice, string>;
    public hasNotice!: HasManyHasAssociationMixin<Notice, string>;
    public countNotices!: HasManyCountAssociationsMixin;
    public createNotice!: HasManyCreateAssociationMixin<Notice>;

    public getSchedules!: HasManyGetAssociationsMixin<Schedule>; // Note the null assertions!
    public addSchedule!: HasManyAddAssociationMixin<Schedule, string>;
    public hasSchedule!: HasManyHasAssociationMixin<Schedule, string>;
    public countSchedules!: HasManyCountAssociationsMixin;
    public createSchedule!: HasManyCreateAssociationMixin<Schedule>;

    public getGallery!: HasManyGetAssociationsMixin<Gallery>; // Note the null assertions!
    public addGallery!: HasManyAddAssociationMixin<Gallery, string>;
    public hasGallery!: HasManyHasAssociationMixin<Gallery, string>;
    public countGalleries!: HasManyCountAssociationsMixin;
    public createGallery!: HasManyCreateAssociationMixin<Gallery>;

    public getGroupToMember!: HasManyGetAssociationsMixin<GroupToMember>; // Note the null assertions!
    public addGroupToMember!: HasManyAddAssociationMixin<GroupToMember, string>;
    public hasGroupToMember!: HasManyHasAssociationMixin<GroupToMember, string>;
    public countGroupToMembers!: HasManyCountAssociationsMixin;
    public createGroupToMembers!: HasManyCreateAssociationMixin<GroupToMember>;

    // public getMembers!: BelongsToManyGetAssociationsMixin<Member>; // Note the null assertions!
    // public addMember!: BelongsToManyAddAssociationMixin<Member, string>;
    // public addMembers!: BelongsToManyAddAssociationsMixin<Member, string>;
    // public hasMember!: BelongsToManyHasAssociationMixin<Member, string>;
    // public hasMembers!: BelongsToManyHasAssociationsMixin<Member, string>;
    // public createMember!: BelongsToManyCreateAssociationMixin<Member>;
    // public removeMember!: BelongsToManyRemoveAssociationMixin<Member, string>;
    // public removeMembers!: BelongsToManyRemoveAssociationsMixin<Member, string>;
    // public countMembers!: BelongsToManyCountAssociationsMixin;

    public readonly agenda?: Agenda[];
    public readonly notice?: Notice[];
    public readonly schedule?: Schedule[];
    public readonly gallery?: Gallery[];
    public readonly groupToMember?: GroupToMember[];

    public static associations: {
        agendas: Association<Group, Agenda>;
        notices: Association<Group, Notice>;
        schedules: Association<Group, Schedule>;
        galleries: Association<Group, Gallery>;
        members: Association<Group, GroupToMember>;
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
