import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupGalleryPostModelTypes {
    export interface IBaseGroupGalleryPostTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupGalleryPostScheme extends ModelAttributes {
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
        galleryId: IColumnOption;
    }
    export const attr: GroupGalleryPostModelTypes.IGroupGalleryPostScheme = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        galleryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
}
