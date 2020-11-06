import { Sequelize, DataTypes, InitOptions, ModelAttributes } from "sequelize";
export namespace MemberModelTypes {
    export interface IBaseMemberTableOptions extends InitOptions {
        sequelize: Sequelize;

        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
    }
    export interface IMemberScheme extends ModelAttributes {
        memberId: IColumnOption;
    }
    export const attr: MemberModelTypes.IMemberScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
}
