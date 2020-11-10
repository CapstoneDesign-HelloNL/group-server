import { Model, Sequelize, Optional } from "sequelize";
import { GalleryPostPhotoModelTypes } from "@src/vo/group/models/GalleryPostPhotoModel";
import { GalleryPostPhotoTypes } from "@src/vo/group/controllers/GalleryPostPhoto";

interface GalleryPostPhotoCreationAttributes
    extends Optional<GalleryPostPhotoTypes.GalleryPostPhotoBody, "id"> {}
class GalleryPostPhoto
    extends Model
    // extends Model<
    //     GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody,
    //     GroupGalleryPostPhotoCreationAttributes
    // >
    implements GalleryPostPhotoTypes.GalleryPostPhotoBody {
    public id!: number;
    public galleryPostPhotoUrl!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GalleryPostPhotoModelTypes.IBaseGalleryPostPhotoTableOptions = {
            sequelize: connection,
            tableName: "GalleryPostPhoto"
        };
        return GalleryPostPhoto.init(GalleryPostPhotoModelTypes.attr, opt);
    }
}
export default GalleryPostPhoto;
