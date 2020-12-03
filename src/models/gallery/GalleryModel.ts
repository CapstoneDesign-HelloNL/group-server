import {
    Model,
    Sequelize,
    Optional,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { GalleryModelTypes } from "@src/vo/group/models/GalleryModel";
import { GalleryTypes } from "@src/vo/group/controllers/Gallery";
import Post from "../post/PostModel";
import Group from "../group/GroupModel";

interface GalleryCreationAttributes
    extends Optional<GalleryTypes.GalleryBody, "name"> {}
class Gallery extends Model implements GalleryTypes.GalleryBody {
    public name!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly post?: Post[];

    public getPosts!: HasManyGetAssociationsMixin<Post>; // Note the null assertions!
    public addPost!: HasManyAddAssociationMixin<Post, number>;
    public hasPost!: HasManyHasAssociationMixin<Post, number>;
    public countPosts!: HasManyCountAssociationsMixin;
    public createPost!: HasManyCreateAssociationMixin<Post>;

    public getGroups!: BelongsToGetAssociationMixin<Group>; // Note the null assertions!
    public createGroup!: BelongsToCreateAssociationMixin<Group>;
    public setGroup!: BelongsToSetAssociationMixin<Group, "groupName">;

    public static associations: {
        posts: Association<Gallery, Post>;
        agendasToGroup: Association<Gallery, Group>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: GalleryModelTypes.IBaseGalleryTableOptions = {
            sequelize: connection,
            tableName: "Gallery"
        };
        return Gallery.init(GalleryModelTypes.attr, opt);
    }
}
export default Gallery;
