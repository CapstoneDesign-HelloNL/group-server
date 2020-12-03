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
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
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

    public getPosts!: BelongsToGetAssociationMixin<Post>; // Note the null assertions!
    public createPost!: BelongsToCreateAssociationMixin<Post>;
    public setPost!: BelongsToSetAssociationMixin<Post, "postId">;

    public static associations: {
        photosToPost: Association<Photo, Post>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: PhotoModelTypes.IBasePhotoTableOptions = {
            sequelize: connection,
            tableName: "Photo"
        };
        return Photo.init(PhotoModelTypes.attr, opt);
    }
}
export default Photo;
