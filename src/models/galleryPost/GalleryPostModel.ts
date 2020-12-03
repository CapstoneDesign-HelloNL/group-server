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
    BelongsToManyCountAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Association
} from "sequelize";
import { GalleryPostModelTypes } from "@src/vo/group/models/GalleryPostModel";
import { GalleryPostTypes } from "@src/vo/group/controllers/GalleryPost";
import GalleryPhoto from "@src/models/galleryPhoto/GalleryPhotoModel";
class GalleryPost extends Model implements GalleryPostTypes.GalleryPostBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public galleryName!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPhotos!: HasManyGetAssociationsMixin<GalleryPhoto>; // Note the null assertions!
    public addPhoto!: HasManyAddAssociationMixin<GalleryPhoto, number>;
    public hasPhoto!: HasManyHasAssociationMixin<GalleryPhoto, number>;
    public countPhotos!: HasManyCountAssociationsMixin;
    public createPhoto!: HasManyCreateAssociationMixin<GalleryPhoto>;

    public static associations: {
        galleryPostPhoto: Association<GalleryPost, GalleryPhoto>;
    };
    // public getPostToPhotos!: BelongsToManyGetAssociationsMixin<GalleryPhoto>; // Note the null assertions!
    // public addPostToPhoto!: BelongsToManyAddAssociationMixin<
    //     GalleryPhoto,
    //     string
    // >;
    // public addPostToPhotos!: BelongsToManyAddAssociationsMixin<
    //     GalleryPhoto,
    //     string
    // >;
    // public hasPostToPhoto!: BelongsToManyHasAssociationMixin<
    //     GalleryPhoto,
    //     string
    // >;
    // public hasPostToPhotos!: BelongsToManyHasAssociationsMixin<
    //     GalleryPhoto,
    //     string
    // >;
    // public createPostToPhoto!: BelongsToManyCreateAssociationMixin<
    //     GalleryPhoto
    // >;
    // public removePostToPhoto!: BelongsToManyRemoveAssociationMixin<
    //     GalleryPhoto,
    //     string
    // >;
    // public removePostToPhotos!: BelongsToManyRemoveAssociationsMixin<
    //     GalleryPhoto,
    //     string
    // >;
    // public countPostToPhotos!: BelongsToManyCountAssociationsMixin;

    static initiate(connection: Sequelize): Model {
        const opt: GalleryPostModelTypes.IBaseGalleryPostTableOptions = {
            sequelize: connection,
            tableName: "GalleryPost"
        };
        return GalleryPost.init(GalleryPostModelTypes.attr, opt);
    }
}
export default GalleryPost;
