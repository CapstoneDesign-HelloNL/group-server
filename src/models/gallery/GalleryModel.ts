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
import { GalleryModelTypes } from "@src/vo/group/models/GalleryModel";
import { GalleryTypes } from "@src/vo/group/controllers/Gallery";
import GalleryPost from "../galleryPost/GalleryPostModel";

interface GalleryCreationAttributes
    extends Optional<GalleryTypes.GalleryBody, "name"> {}
class Gallery extends Model implements GalleryTypes.GalleryBody {
    public name!: string;
    public groupName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getGallerys!: HasManyGetAssociationsMixin<GalleryPost>; // Note the null assertions!
    public addGallery!: HasManyAddAssociationMixin<GalleryPost, number>;
    public hasGallery!: HasManyHasAssociationMixin<GalleryPost, number>;
    public countGalleries!: HasManyCountAssociationsMixin;
    public createGallery!: HasManyCreateAssociationMixin<GalleryPost>;

    public static associations: {
        galleryPosts: Association<Gallery, GalleryPost>;
    };

    public readonly groupGalleryPost?: GalleryPost[];
    static initiate(connection: Sequelize): Model {
        const opt: GalleryModelTypes.IBaseGalleryTableOptions = {
            sequelize: connection,
            tableName: "Gallery"
        };
        return Gallery.init(GalleryModelTypes.attr, opt);
    }
}
export default Gallery;
