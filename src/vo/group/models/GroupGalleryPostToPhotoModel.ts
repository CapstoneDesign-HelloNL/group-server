import {
    Sequelize,
    DataTypes,
    InitOptions,
    Model,
    ModelAttributes,
    ModelAttributeColumnReferencesOptions,
    ModelValidateOptions
} from "sequelize";
export namespace GroupGalleryPostToPhotoModelTypes {
    export interface IBaseGroupGalleryPostToPhotoTableOptions
        extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IForeignReferences
        extends ModelAttributeColumnReferencesOptions {
        model: string | typeof Model;
        key: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        references?: IForeignReferences;
        validate?: ModelValidateOptions;
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
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: "GroupGalleryPost",
                key: "id"
            }
        },
        galleryPhotoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            references: {
                model: "GroupGalleryPostPhoto",
                key: "id"
            }
        }
    };
}
