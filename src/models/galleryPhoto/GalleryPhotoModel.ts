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
import { GalleryPhotoModelTypes } from "@src/vo/group/models/GalleryPostPhotoModel";
import { GalleryPhotoTypes } from "@src/vo/group/controllers/GalleryPostPhoto";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";

interface GalleryPostPhotoCreationAttributes
    extends Optional<GalleryPhotoTypes.GalleryPhotoBody, "id"> {}
class GalleryPhoto
    extends Model
    // extends Model<
    //     GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody,
    //     GroupGalleryPostPhotoCreationAttributes
    // >
    implements GalleryPhotoTypes.GalleryPhotoBody {
    public id!: number;
    public galleryPhotoUrl!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPhotoToPosts!: BelongsToManyGetAssociationsMixin<GalleryPost>; // Note the null assertions!
    public addPhotoToPost!: BelongsToManyAddAssociationMixin<
        GalleryPost,
        string
    >;
    public addPhotoToPosts!: BelongsToManyAddAssociationsMixin<
        GalleryPost,
        string
    >;
    public hasPhotoToPost!: BelongsToManyHasAssociationMixin<
        GalleryPost,
        string
    >;
    public hasPhotoToPosts!: BelongsToManyHasAssociationsMixin<
        GalleryPost,
        string
    >;
    public createPhotoToPost!: BelongsToManyCreateAssociationMixin<GalleryPost>;
    public removePhotoToPost!: BelongsToManyRemoveAssociationMixin<
        GalleryPost,
        string
    >;
    public removePhotoToPosts!: BelongsToManyRemoveAssociationsMixin<
        GalleryPost,
        string
    >;
    public countPhotoToPosts!: BelongsToManyCountAssociationsMixin;

    static initiate(connection: Sequelize): Model {
        const opt: GalleryPhotoModelTypes.IBaseGalleryPhotoTableOptions = {
            sequelize: connection,
            tableName: "GalleryPhoto"
        };
        return GalleryPhoto.init(GalleryPhotoModelTypes.attr, opt);
    }
}
export default GalleryPhoto;
