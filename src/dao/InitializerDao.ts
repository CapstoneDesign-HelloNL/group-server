/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Group from "@src/models/group/GroupModel";
import Member from "@src/models/member/MemberModel";

import Agenda from "@src/models/agenda/AgendaModel";
import Schedule from "@src/models/schedule/ScheduleModel";
import Notice from "@src/models/notice/NoticeModel";
import Gallery from "@src/models/gallery/GalleryModel";

import Post from "@src/models/post/PostModel";
import Photo from "@src/models/photo/PhotoModel";

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

        Agenda.initiate(this.db.getConnection());
        Notice.initiate(this.db.getConnection());
        Schedule.initiate(this.db.getConnection());
        Gallery.initiate(this.db.getConnection());

        Post.initiate(this.db.getConnection());
        Photo.initiate(this.db.getConnection());
        // GalleryPostToPhoto.initiate(this.db.getConnection());

        Group.hasMany(Agenda, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "agendasToGroup" // this determines the name in `associations`!
        });

        Group.hasMany(Notice, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "noticesToGroup" // this determines the name in `associations`!
        });

        Group.hasMany(Schedule, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "schedulesToGroup" // this determines the name in `associations`!
        });

        Group.hasMany(Gallery, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "galleriesToGroup" // this determines the name in `associations`!
        });

        Group.hasMany(Member, {
            sourceKey: "name",
            foreignKey: "groupName",
            as: "membersToGroup" // this determines the name in `associations`!
        });

        Gallery.hasMany(Post, {
            sourceKey: "name",
            foreignKey: "galleryName",
            as: "postsToGallery" // this determines the name in `associations`!
        });

        Gallery.hasMany(Post, {
            sourceKey: "groupName",
            foreignKey: "groupName",
            as: "postsToGallery2" // this determines the name in `associations`!
        });

        Post.hasMany(Photo, {
            sourceKey: "id",
            foreignKey: "postId",
            as: "photosToPost" // this determines the name in `associations`!
        });

        Member.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "membersToGroup"
        });

        Agenda.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "agendasToGroup"
        });

        Notice.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "noticesToGroup"
        });

        Schedule.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "schedulesToGroup"
        });

        Gallery.belongsTo(Group, {
            targetKey: "name",
            foreignKey: "groupName",
            as: "gallerysToGroup"
        });

        Photo.belongsTo(Post, {
            targetKey: "id",
            foreignKey: "postId",
            as: "photosToPost"
        });

        Post.belongsTo(Gallery, {
            targetKey: "name",
            foreignKey: "galleryName",
            as: "postsToGallery"
        });

        Post.belongsTo(Gallery, {
            targetKey: "groupName",
            foreignKey: "groupName",
            as: "postsToGallery2"
        });

        // GalleryPost.belongsToMany(GalleryPhoto, {
        //     through: "GalleryPostToPhoto",
        //     foreignKey: "galleryPostId",
        //     as: "PostToPhoto"
        // });

        // GalleryPhoto.belongsToMany(GalleryPost, {
        //     through: "GalleryPostToPhoto",
        //     foreignKey: "galleryPhotoId",
        //     as: "PhotoToPost"
        // });
    }

    public async sync(): Promise<void> {
        await Group.sync();
        await Member.sync();

        await Agenda.sync();
        await Notice.sync();
        await Schedule.sync();
        await Gallery.sync();

        await Post.sync();
        await Photo.sync();
        // await GalleryPostToPhoto.sync();
    }
}

export default InitializerDao;
