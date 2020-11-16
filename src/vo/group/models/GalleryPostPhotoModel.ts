import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace GalleryPhotoModelTypes {
    export interface IBaseGalleryPhotoTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IGalleryPhotoScheme extends ModelAttributes {
        galleryPhotoUrl: IColumnOption;
    }
    export const attr: GalleryPhotoModelTypes.IGalleryPhotoScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        galleryPhotoUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true,
                notEmpty: true
            }
        }
    };
}
