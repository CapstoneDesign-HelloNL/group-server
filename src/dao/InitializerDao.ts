/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Member from "@src/models/member/MemberModel";
import Group from "@src/models/group/GroupModel";
import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";

import Agenda from "@src/models/agenda/AgendaModel";
import Schedule from "@src/models/schedule/ScheduleModel";
import Notice from "@src/models/notice/NoticeModel";
import Gallery from "@src/models/gallery/GalleryModel";

import GalleryPost from "@src/models/galleryPost/GalleryPostModel";
import GalleryPostPhoto from "@src/models/galleryPostPhoto/GalleryPostPhotoModel";
import GalleryPostToPhoto from "@src/models/galleryPostToPhoto/GalleryPostToPhotoModel";

import GroupDBManager from "@src/models/GroupDBManager";
import Dao from "@src/dao/Dao";

class InitializerDao extends Dao {
    protected db: GroupDBManager;
    protected constructor() {
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

        Agenda.initiate(this.db.getConnection());
        Notice.initiate(this.db.getConnection());
        Schedule.initiate(this.db.getConnection());
        Gallery.initiate(this.db.getConnection());

        GalleryPost.initiate(this.db.getConnection());
        GalleryPostPhoto.initiate(this.db.getConnection());
        GalleryPostToPhoto.initiate(this.db.getConnection());

        Group.hasMany(Agenda, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "agendas" // this determines the name in `associations`!
        });

        Group.hasMany(Notice, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "notices" // this determines the name in `associations`!
        });

        Group.hasMany(Schedule, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "schedules" // this determines the name in `associations`!
        });

        Group.hasMany(Gallery, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "galleries" // this determines the name in `associations`!
        });

        Group.belongsToMany(Member, {
            through: "GroupToMember",
            foreignKey: "groupName", // replaces `productId`
            as: "members"
        });
        Member.belongsToMany(Group, {
            through: "GroupToMember",
            foreignKey: "memberEmail",
            as: "memberToGroup"
        });

        Agenda.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "agendasToGroups"
        });

        Notice.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "noticesToGroups"
        });

        Schedule.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "schedulesToGroups"
        });

        Gallery.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "gallerysToGroups"
        });

        GalleryPost.belongsToMany(GalleryPostPhoto, {
            through: "GalleryPostToPhoto"
        });

        GalleryPostPhoto.belongsToMany(GalleryPost, {
            through: "GalleryPostToPhoto"
        });
    }

    public async sync(): Promise<void> {
        await Group.sync();
        await Member.sync();
        await GroupToMember.sync();

        await Agenda.sync();
        await Notice.sync();
        await Schedule.sync();
        await Gallery.sync();

        await GalleryPost.sync();
        await GalleryPostPhoto.sync();
        await GalleryPostToPhoto.sync();
        // await this.endConnect();
    }
}

export default InitializerDao;
