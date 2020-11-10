import {
    Model,
    Sequelize,
    Optional,
    Association,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from "sequelize";
import { GroupGalleryModelTypes } from "@src/vo/group/models/GroupGalleryModel";
import { GroupGalleryTypes } from "@src/vo/group/controllers/GroupGallery";
import GroupGalleryPost from "../groupGalleryPost/GroupGalleryPostModel";

interface GroupGalleryCreationAttributes
    extends Optional<GroupGalleryTypes.GroupGalleryBody, "name"> {}
class GroupGallery
    extends Model
    // extends Model<
    //     GroupGalleryTypes.GroupGalleryBody,
    //     GroupGalleryCreationAttributes
    // >
    implements GroupGalleryTypes.GroupGalleryBody {
    public name!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGroupGallerys!: HasManyGetAssociationsMixin<GroupGalleryPost>; // Note the null assertions!
    public addGroupGallery!: HasManyAddAssociationMixin<
        GroupGalleryPost,
        number
    >;
    public hasGroupGallery!: HasManyHasAssociationMixin<
        GroupGalleryPost,
        number
    >;
    public countGroupGalleries!: HasManyCountAssociationsMixin;
    public createGroupGallery!: HasManyCreateAssociationMixin<GroupGalleryPost>;

    public static associations: {
        galleryPosts: Association<GroupGallery, GroupGalleryPost>;
    };

    public readonly groupGalleryPost?: GroupGalleryPost[];
    static initiate(connection: Sequelize): Model {
        const opt: GroupGalleryModelTypes.IBaseGroupGalleryTableOptions = {
            sequelize: connection,
            tableName: "GroupGallery"
        };
        return GroupGallery.init(GroupGalleryModelTypes.attr, opt);
    }
}
export default GroupGallery;
