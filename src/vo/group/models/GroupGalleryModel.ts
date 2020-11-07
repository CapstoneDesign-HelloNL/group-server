import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupGalleryModelTypes {
    export interface IBaseGroupGalleryTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupGalleryScheme extends ModelAttributes {
        title: IColumnOption;
        groupId: IColumnOption;
    }
    export const attr: GroupGalleryModelTypes.IGroupGalleryScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
}
