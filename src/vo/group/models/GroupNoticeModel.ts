import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupNoticeModelTypes {
    export interface IBaseGroupNoticeTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupNoticeScheme extends ModelAttributes {
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
        photo: IColumnOption;
        groupName: IColumnOption;
    }
    export const attr: GroupNoticeModelTypes.IGroupNoticeScheme = {
        id: {
            type: DataTypes.INTEGER,
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
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
}
