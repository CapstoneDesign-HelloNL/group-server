import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace GroupGalleryPostPhotoModelTypes {
    export interface IBaseGroupGalleryPostPhotoTableOptions
        extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        validate?: ModelValidateOptions;
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
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true,
                notEmpty: true
            }
        }
    };
}
