import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupAgendaModelTypes {
    export interface IBaseGroupAgendaTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupAgendaScheme extends ModelAttributes {
        content: IColumnOption;
        groupId: IColumnOption;
    }
    export const attr: GroupAgendaModelTypes.IGroupAgendaScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
}
