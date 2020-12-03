import {
    Model,
    Sequelize,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { PostModelTypes } from "@src/vo/group/models/PostModel";
import { PostTypes } from "@src/vo/group/controllers/Post";
import Photo from "@src/models/photo/PhotoModel";
import Gallery from "../gallery/GalleryModel";
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

    public getGalleries!: BelongsToGetAssociationMixin<Gallery>; // Note the null assertions!
    public createGallery!: BelongsToCreateAssociationMixin<Gallery>;
    public setGallery!: BelongsToSetAssociationMixin<Gallery, "galleryName">;

    public static associations: {
        photos: Association<Post, Photo>;
        postsToGallery: Association<Post, Gallery>;
    };
    static initiate(connection: Sequelize): Model {
        const opt: PostModelTypes.IBasePostTableOptions = {
            sequelize: connection,
            tableName: "Post"
        };
        return Post.init(PostModelTypes.attr, opt);
    }
}
export default Post;
