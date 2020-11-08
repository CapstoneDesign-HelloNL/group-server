import Member from "@src/models/member/MemberModel";
import Group from "@src/models/group/GroupModel";
import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";

import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupSchedule from "@src/models/groupSchedule/GroupScheduleModel";
import GroupNotice from "@src/models/groupNotice/GroupNoticeModel";
import GroupGallery from "@src/models/groupGallery/GroupGalleryModel";

import GroupGalleryPost from "@src/models/groupGalleryPost/GroupGalleryPostModel";
import GroupGalleryPostPhoto from "@src/models/groupGalleryPostPhoto/GroupGalleryPostPhotoModel";
import GroupGalleryPostToPhoto from "@src/models/groupGalleryPostToPhoto/GroupGalleryPostToPhotoModel";

import GroupDBManager from "@src/models/GroupDBManager";
import Dao from "@src/dao/Dao";

class InitializerDao extends Dao {
    protected db: GroupDBManager;
    constructor() {
        super();
        this.db = GroupDBManager.getInstance();
        const firstInit = async () => await this.init();
        const firstSync = async () => await this.sync();
        firstInit();
        firstSync();
    }

    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    public async init(): Promise<void> {
        Group.initiate(this.db.getConnection());
        Member.initiate(this.db.getConnection());
        GroupToMember.initiate(this.db.getConnection());

        GroupAgenda.initiate(this.db.getConnection());
        GroupNotice.initiate(this.db.getConnection());
        GroupSchedule.initiate(this.db.getConnection());
        GroupGallery.initiate(this.db.getConnection());

        GroupGalleryPost.initiate(this.db.getConnection());
        GroupGalleryPostPhoto.initiate(this.db.getConnection());
        GroupGalleryPostToPhoto.initiate(this.db.getConnection());

        Group.hasMany(GroupAgenda, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "agendas" // this determines the name in `associations`!
        });

        Group.hasMany(GroupNotice, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "notices" // this determines the name in `associations`!
        });

        Group.hasMany(GroupSchedule, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "schedules" // this determines the name in `associations`!
        });

        Group.hasMany(GroupGallery, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "galleries" // this determines the name in `associations`!
        });

        Group.belongsToMany(Member, {
            through: "GroupToMember",
            foreignKey: "groupName", // replaces `productId`
            otherKey: "memberEmail" // replaces `categoryId`
        });
        Member.belongsToMany(Group, {
            through: "GroupToMember",
            foreignKey: "memberEmail",
            otherKey: "groupName"
        });

        GroupAgenda.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "agendasToGroups"
        });

        GroupNotice.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "noticesToGroups"
        });

        GroupSchedule.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "schedulesToGroups"
        });

        GroupGallery.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "gallerysToGroups"
        });

        GroupGalleryPost.belongsToMany(GroupGalleryPostPhoto, {
            through: "GroupGalleryPostToPhoto"
        });

        GroupGalleryPostPhoto.belongsToMany(GroupGalleryPost, {
            through: "GroupGalleryPostToPhoto"
        });
    }

    public async sync(): Promise<void> {
        await Group.sync();
        await Member.sync();
        await GroupToMember.sync();

        await GroupAgenda.sync();
        await GroupNotice.sync();
        await GroupSchedule.sync();
        await GroupGallery.sync();

        await GroupGalleryPost.sync();
        await GroupGalleryPostPhoto.sync();
        await GroupGalleryPostToPhoto.sync();
        // await this.endConnect();
    }
}

export default InitializerDao;
