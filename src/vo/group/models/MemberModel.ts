import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace MemberModelTypes {
    export interface IBaseMemberTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
    }
    export interface IMemberScheme extends ModelAttributes {
        email: IColumnOption;
    }
    export const attr: MemberModelTypes.IMemberScheme = {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    };
}
