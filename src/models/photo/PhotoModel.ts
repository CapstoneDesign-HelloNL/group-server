import {
    Model,
    Sequelize,
    Optional,
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
import { PhotoModelTypes } from "@src/vo/group/models/PhotoModel";
import { PhotoTypes } from "@src/vo/group/controllers/Photo";
import Post from "@src/models/post/PostModel";

class Photo extends Model implements PhotoTypes.PhotoBody {
    public id!: number;
    public photoUrl!: string;
    public postId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public getPhotoToPosts!: BelongsToManyGetAssociationsMixin<GalleryPost>; // Note the null assertions!
    // public addPhotoToPost!: BelongsToManyAddAssociationMixin<
    //     GalleryPost,
    //     string
    // >;
    // public addPhotoToPosts!: BelongsToManyAddAssociationsMixin<
    //     GalleryPost,
    //     string
    // >;
    // public hasPhotoToPost!: BelongsToManyHasAssociationMixin<
    //     GalleryPost,
    //     string
    // >;
    // public hasPhotoToPosts!: BelongsToManyHasAssociationsMixin<
    //     GalleryPost,
    //     string
    // >;
    // public createPhotoToPost!: BelongsToManyCreateAssociationMixin<GalleryPost>;
    // public removePhotoToPost!: BelongsToManyRemoveAssociationMixin<
    //     GalleryPost,
    //     string
    // >;
    // public removePhotoToPosts!: BelongsToManyRemoveAssociationsMixin<
    //     GalleryPost,
    //     string
    // >;
    // public countPhotoToPosts!: BelongsToManyCountAssociationsMixin;

    static initiate(connection: Sequelize): Model {
        const opt: PhotoModelTypes.IBasePhotoTableOptions = {
            sequelize: connection,
            tableName: "Photo"
        };
        return Photo.init(PhotoModelTypes.attr, opt);
    }
}
export default Photo;
