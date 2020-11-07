import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupGalleryPostPhotoModelTypes {
    export interface IBaseGroupGalleryPostPhotoTableOptions
        extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupGalleryPostPhotoScheme extends ModelAttributes {
        galleryPostPhotoUrl: IColumnOption;
    }
    export const attr: GroupGalleryPostPhotoModelTypes.IGroupGalleryPostPhotoScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        galleryPostPhotoUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
}
