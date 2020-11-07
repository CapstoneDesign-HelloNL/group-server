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
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupSchedule from "@src/models/groupSchedule/GroupScheduleModel";
import GroupNotice from "@src/models/groupNotice/GroupNoticeModel";
import GroupGallery from "../groupGallery/GroupGalleryModel";

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

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    public getGroupAgendas!: HasManyGetAssociationsMixin<GroupAgenda>; // Note the null assertions!
    public addGroupAgenda!: HasManyAddAssociationMixin<GroupAgenda, number>;
    public hasGroupAgenda!: HasManyHasAssociationMixin<GroupAgenda, number>;
    public countGroupAgendas!: HasManyCountAssociationsMixin;
    public createGroupAgenda!: HasManyCreateAssociationMixin<GroupAgenda>;

    public getGroupNotices!: HasManyGetAssociationsMixin<GroupNotice>; // Note the null assertions!
    public addGroupNotice!: HasManyAddAssociationMixin<GroupNotice, number>;
    public hasGroupNotice!: HasManyHasAssociationMixin<GroupNotice, number>;
    public countGroupNotices!: HasManyCountAssociationsMixin;
    public createGroupNotice!: HasManyCreateAssociationMixin<GroupNotice>;

    public getGroupSchedules!: HasManyGetAssociationsMixin<GroupSchedule>; // Note the null assertions!
    public addGroupSchedule!: HasManyAddAssociationMixin<GroupSchedule, number>;
    public hasGroupSchedule!: HasManyHasAssociationMixin<GroupSchedule, number>;
    public countGroupSchedules!: HasManyCountAssociationsMixin;
    public createGroupSchedule!: HasManyCreateAssociationMixin<GroupSchedule>;

    public getGroupGallery!: HasManyGetAssociationsMixin<GroupGallery>; // Note the null assertions!
    public addGroupGallery!: HasManyAddAssociationMixin<GroupGallery, number>;
    public hasGroupGallery!: HasManyHasAssociationMixin<GroupGallery, number>;
    public countGroupGalleries!: HasManyCountAssociationsMixin;
    public createGroupGallery!: HasManyCreateAssociationMixin<GroupGallery>;

    public readonly groupAgenda?: GroupAgenda[];
    public readonly groupNotice?: GroupNotice[];
    public readonly groupSchedule?: GroupSchedule[];
    public readonly groupGallery?: GroupGallery[];

    public static associations: {
        agendas: Association<Group, GroupAgenda>;
        notices: Association<Group, GroupNotice>;
        schedules: Association<Group, GroupSchedule>;
        galleries: Association<Group, GroupGallery>;
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