import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupScheduleModelTypes {
    export interface IBaseGroupScheduleTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupScheduleScheme extends ModelAttributes {
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
        startDate: IColumnOption;
        endDate: IColumnOption;
        groupName: IColumnOption;
    }
    export const attr: GroupScheduleModelTypes.IGroupScheduleScheme = {
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
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
}
