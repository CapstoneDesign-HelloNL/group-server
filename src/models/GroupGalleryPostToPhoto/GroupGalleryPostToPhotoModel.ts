import { Model, Sequelize, Optional } from "sequelize";
import { GroupGalleryPostToPhotoModelTypes } from "@src/vo/group/models/GroupGalleryPostToPhotoModel";
import { GroupGalleryPostToPhotoTypes } from "@src/vo/group/controllers/GroupGalleryPostToPhoto";

interface GroupGalleryPostToPhotoCreationAttributes
    extends Optional<
        GroupGalleryPostToPhotoTypes.GroupGalleryPostToPhotoBody,
        "id"
    > {}
class GroupGalleryPostToPhoto
    extends Model<
        GroupGalleryPostToPhotoTypes.GroupGalleryPostToPhotoBody,
        GroupGalleryPostToPhotoCreationAttributes
    >
    implements GroupGalleryPostToPhotoTypes.GroupGalleryPostToPhotoBody {
    public id!: number;
    public galleryPostId!: number;
    public galleryPhotoId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupGalleryPostToPhotoModelTypes.IBaseGroupGalleryPostToPhotoTableOptions = {
            sequelize: connection,
            tableName: "GroupGalleryPostToPhoto"
        };
        return GroupGalleryPostToPhoto.init(
            GroupGalleryPostToPhotoModelTypes.attr,
            opt
        );
    }
}
export default GroupGalleryPostToPhoto;
