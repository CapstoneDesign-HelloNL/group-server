import { Model, Sequelize, Optional } from "sequelize";
import { GalleryPostToPhotoModelTypes } from "@src/vo/group/models/GalleryPostToPhotoModel";
import { GalleryPostToPhotoTypes } from "@src/vo/group/controllers/GalleryPostToPhoto";

interface GalleryPostToPhotoCreationAttributes
    extends Optional<GalleryPostToPhotoTypes.GalleryPostToPhotoBody, "id"> {}
class GalleryPostToPhoto
    extends Model
    // extends Model<
    //     GroupGalleryPostToPhotoTypes.GroupGalleryPostToPhotoBody,
    //     GroupGalleryPostToPhotoCreationAttributes
    // >
    implements GalleryPostToPhotoTypes.GalleryPostToPhotoBody {
    public id!: number;
    public galleryPostId!: number;
    public galleryPhotoId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GalleryPostToPhotoModelTypes.IBaseGalleryPostToPhotoTableOptions = {
            sequelize: connection,
            tableName: "GalleryPostToPhoto"
        };
        return GalleryPostToPhoto.init(GalleryPostToPhotoModelTypes.attr, opt);
    }
}
export default GalleryPostToPhoto;
