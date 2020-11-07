import GroupDBManager from "@src/models/GroupDBManager";
import Member from "@src/models/member/MemberModel";
import Group from "@src/models/group/GroupModel";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupSchedule from "@src/models/groupSchedule/GroupScheduleModel";
import GroupNotice from "@src/models/groupNotice/GroupNoticeModel";
import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";
import GroupGallery from "@src/models/groupGallery/GroupGalleryModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupTypes } from "@src/vo/group/controllers/Group";

const logger = LogService.getInstance();
class GroupDao extends Dao {
    private constructor() {
        super();
        this.db = GroupDBManager.getInstance();
        // Group.initiate(this.db.getConnection());
        // Member.initiate(this.db.getConnection());
        // GroupAgenda.initiate(this.db.getConnection());
        // GroupNotice.initiate(this.db.getConnection());
        // GroupSchedule.initiate(this.db.getConnection());
        // GroupToMember.initiate(this.db.getConnection());
        // GroupGallery.initiate(this.db.getConnection());
        // Group.hasMany(GroupAgenda, {
        //     sourceKey: "id",
        //     foreignKey: "groupId",
        //     as: "agendas" // this determines the name in `associations`!
        // });

        // Group.hasMany(GroupNotice, {
        //     sourceKey: "id",
        //     foreignKey: "groupId",
        //     as: "notices" // this determines the name in `associations`!
        // });

        // Group.hasMany(GroupSchedule, {
        //     sourceKey: "id",
        //     foreignKey: "groupId",
        //     as: "schedules" // this determines the name in `associations`!
        // });

        // Group.hasMany(GroupGallery, {
        //     sourceKey: "id",
        //     foreignKey: "groupId",
        //     as: "galleries" // this determines the name in `associations`!
        // });

        // Group.belongsToMany(Member, { through: "GroupToMember" });
        // Member.belongsToMany(Group, { through: "GroupToMember" });
        // const firstSync = async () => {
        //     await Group.sync();
        //     await Member.sync();
        //     await GroupAgenda.sync();
        //     await GroupNotice.sync();
        //     await GroupSchedule.sync();
        //     await GroupToMember.sync();
        //     await GroupGallery.sync();
        //     // await this.endConnect();
        // };
        // firstSync();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(name: string): Promise<Group | null | undefined> {
        // await this.connect();
        let group: Group | null = null;
        console.log(group);
        try {
            group = await Group.findOne({
                where: {
                    name
                }
            });
        } catch (err) {
            logger.error(err);
            // await this.endConnect();
            return undefined;
        }
        // // await this.endConnect();
        return group;
    }

    async findAll(name: string): Promise<Group[] | null | undefined> {
        // await this.connect();
        let groups: Group[] | null = null;
        console.log(groups);
        try {
            groups = await Group.findAll({
                where: {
                    name
                }
            });
        } catch (err) {
            logger.error(err);
            // await this.endConnect();
            return undefined;
        }
        // // await this.endConnect();
        return groups;
    }

    async save(
        groupData: GroupTypes.GroupPostBody
    ): Promise<Group | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });
        // else await Group.sync();

        let newGroup: Group | null = null;
        try {
            newGroup = await Group.create(groupData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return newGroup;
    }

    async update(
        groupData: GroupTypes.GroupPostBody,
        afterGroupData: GroupTypes.GroupPostBody
    ): Promise<any | null | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });
        // else await Group.sync();

        let updateGroup: any | null = null;
        try {
            updateGroup = await Group.update(
                { ...afterGroupData },
                { where: { ...groupData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return updateGroup;
    }

    async delete(
        groupData: GroupTypes.GroupPostBody
    ): Promise<number | undefined> {
        // await this.connect();
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });
        // else await Group.sync();

        let deleteGroup: number | null = null;
        try {
            deleteGroup = await Group.destroy({
                where: {
                    ...groupData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        // // await this.endConnect();
        return deleteGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupDao;