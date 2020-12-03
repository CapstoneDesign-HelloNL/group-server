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
import { PostModelTypes } from "@src/vo/group/models/PostModel";
import { PostTypes } from "@src/vo/group/controllers/Post";
import Photo from "@src/models/photo/PhotoModel";
class Post extends Model implements PostTypes.PostBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public galleryName!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPhotos!: HasManyGetAssociationsMixin<Photo>; // Note the null assertions!
    public addPhoto!: HasManyAddAssociationMixin<Photo, number>;
    public hasPhoto!: HasManyHasAssociationMixin<Photo, number>;
    public countPhotos!: HasManyCountAssociationsMixin;
    public createPhoto!: HasManyCreateAssociationMixin<Photo>;

    public static associations: {
        galleryPostPhoto: Association<Post, Photo>;
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
        const opt: PostModelTypes.IBasePostTableOptions = {
            sequelize: connection,
            tableName: "Post"
        };
        return Post.init(PostModelTypes.attr, opt);
    }
}
export default Post;
