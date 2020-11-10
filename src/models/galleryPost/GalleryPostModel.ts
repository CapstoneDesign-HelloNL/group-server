import { Model, Sequelize, Optional } from "sequelize";
import { GalleryPostModelTypes } from "@src/vo/group/models/GalleryPostModel";
import { GalleryPostTypes } from "@src/vo/group/controllers/GalleryPost";

interface GalleryPostCreationAttributes
    extends Optional<GalleryPostTypes.GalleryPostBody, "id"> {}
class GalleryPost
    extends Model
    // extends Model<
    //     GroupGalleryPostTypes.GroupGalleryPostBody,
    //     GroupGalleryPostCreationAttributes
    // >
    implements GalleryPostTypes.GalleryPostBody {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public galleryName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initiate(connection: Sequelize): Model {
        const opt: GalleryPostModelTypes.IBaseGalleryPostTableOptions = {
            sequelize: connection,
            tableName: "GalleryPost"
        };
        return GalleryPost.init(GalleryPostModelTypes.attr, opt);
    }
}
export default GalleryPost;
