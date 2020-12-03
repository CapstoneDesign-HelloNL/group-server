import {
    Model,
    Sequelize,
    Optional,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from "sequelize";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";
import { GroupTypes } from "@src/vo/group/controllers/Group";
import Agenda from "@src/models/agenda/AgendaModel";
import Schedule from "@src/models/schedule/ScheduleModel";
import Notice from "@src/models/notice/NoticeModel";
import Gallery from "@src/models/gallery/GalleryModel";
import Member from "@src/models/member/MemberModel";

class Group extends Model implements GroupTypes.GroupBody {
    public name!: string;
    public admin!: string;
    public advisor!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getAgendas!: HasManyGetAssociationsMixin<Agenda>; // Note the null assertions!
    public addAgenda!: HasManyAddAssociationMixin<Agenda, string>;
    public hasAgenda!: HasManyHasAssociationMixin<Agenda, string>;
    public countAgendas!: HasManyCountAssociationsMixin;
    public createAgenda!: HasManyCreateAssociationMixin<Agenda>;

    public getNotices!: HasManyGetAssociationsMixin<Notice>; // Note the null assertions!
    public addNotice!: HasManyAddAssociationMixin<Notice, number>;
    public hasNotice!: HasManyHasAssociationMixin<Notice, number>;
    public countNotices!: HasManyCountAssociationsMixin;
    public createNotice!: HasManyCreateAssociationMixin<Notice>;

    public getSchedules!: HasManyGetAssociationsMixin<Schedule>; // Note the null assertions!
    public addSchedule!: HasManyAddAssociationMixin<Schedule, number>;
    public hasSchedule!: HasManyHasAssociationMixin<Schedule, number>;
    public countSchedules!: HasManyCountAssociationsMixin;
    public createSchedule!: HasManyCreateAssociationMixin<Schedule>;

    public getGalleries!: HasManyGetAssociationsMixin<Gallery>; // Note the null assertions!
    public addGallery!: HasManyAddAssociationMixin<Gallery, string>;
    public hasGallery!: HasManyHasAssociationMixin<Gallery, string>;
    public countGalleries!: HasManyCountAssociationsMixin;
    public createGallery!: HasManyCreateAssociationMixin<Gallery>;

    public getMembers!: HasManyGetAssociationsMixin<Member>; // Note the null assertions!
    public addMember!: HasManyAddAssociationMixin<Member, string>;
    public hasMember!: HasManyHasAssociationMixin<Member, string>;
    public countMembers!: HasManyCountAssociationsMixin;
    public createMember!: HasManyCreateAssociationMixin<Member>;

    public readonly agenda?: Agenda[];
    public readonly notice?: Notice[];
    public readonly schedule?: Schedule[];
    public readonly gallery?: Gallery[];
    public readonly member?: Member[];

    public static associations: {
        agendas: Association<Group, Agenda>;
        notices: Association<Group, Notice>;
        schedules: Association<Group, Schedule>;
        galleries: Association<Group, Gallery>;
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
