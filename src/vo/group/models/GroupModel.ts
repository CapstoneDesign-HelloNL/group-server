import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace GroupModelTypes {
    export interface IBaseGroupTableOptions extends InitOptions {
        sequelize: Sequelize;

        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IGroupScheme extends ModelAttributes {
        name: IColumnOption;
        admin: IColumnOption;
        advisor: IColumnOption;
    }
    export const attr: GroupModelTypes.IGroupScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        advisor: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
}
