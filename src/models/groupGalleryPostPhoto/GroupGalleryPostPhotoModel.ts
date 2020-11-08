import { Model, Sequelize, Optional } from "sequelize";
import { GroupGalleryPostPhotoModelTypes } from "@src/vo/group/models/GroupGalleryPostPhotoModel";
import { GroupGalleryPostPhotoTypes } from "@src/vo/group/controllers/GroupGalleryPostPhoto";

interface GroupGalleryPostPhotoCreationAttributes
    extends Optional<
        GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody,
        "id"
    > {}
class GroupGalleryPostPhoto
    extends Model<
        GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody,
        GroupGalleryPostPhotoCreationAttributes
    >
    implements GroupGalleryPostPhotoTypes.GroupGalleryPostPhotoBody {
    public id!: number;
    public galleryPostPhotoUrl!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GroupGalleryPostPhotoModelTypes.IBaseGroupGalleryPostPhotoTableOptions = {
            sequelize: connection,
            tableName: "GroupGalleryPostPhoto"
        };
        return GroupGalleryPostPhoto.init(
            GroupGalleryPostPhotoModelTypes.attr,
            opt
        );
    }
}
export default GroupGalleryPostPhoto;
