import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupGalleryPostToPhotoModelTypes {
    export interface IBaseGroupGalleryPostToPhotoTableOptions
        extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupGalleryPostToPhotoScheme extends ModelAttributes {
        galleryPostId: IColumnOption;
        galleryPhotoId: IColumnOption;
    }
    export const attr: GroupGalleryPostToPhotoModelTypes.IGroupGalleryPostToPhotoScheme = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        galleryPostId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        galleryPhotoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
}
