import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace GalleryPostPhotoModelTypes {
    export interface IBaseGalleryPostPhotoTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IGalleryPostPhotoScheme extends ModelAttributes {
        galleryPostPhotoUrl: IColumnOption;
    }
    export const attr: GalleryPostPhotoModelTypes.IGalleryPostPhotoScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        galleryPostPhotoUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true,
                notEmpty: true
            }
        }
    };
}
