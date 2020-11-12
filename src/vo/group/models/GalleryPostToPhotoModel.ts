import {
    Sequelize,
    DataTypes,
    InitOptions,
    Model,
    ModelAttributes,
    ModelAttributeColumnReferencesOptions,
    ModelValidateOptions
} from "sequelize";
export namespace GalleryPostToPhotoModelTypes {
    export interface IBaseGalleryPostToPhotoTableOptions extends InitOptions {
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
        onDelete?: string;
        onUpdate?: string;
        references?: IForeignReferences;
        validate?: ModelValidateOptions;
    }
    export interface IGalleryPostToPhotoScheme extends ModelAttributes {
        galleryPostId: IColumnOption;
        galleryPhotoId: IColumnOption;
    }
    export const attr: GalleryPostToPhotoModelTypes.IGalleryPostToPhotoScheme = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        galleryPostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            validate: {
                notEmpty: true
            },
            references: {
                model: "GalleryPost",
                key: "id"
            }
        },
        galleryPhotoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            validate: {
                notEmpty: true
            },
            references: {
                model: "GalleryPostPhoto",
                key: "id"
            }
        }
    };
}
