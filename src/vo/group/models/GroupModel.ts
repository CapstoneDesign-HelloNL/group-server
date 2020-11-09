import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace GroupModelTypes {
    export interface IBaseGroupTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: true;
        validate?: ModelValidateOptions;
    }
    export interface IGroupScheme extends ModelAttributes {
        name: IColumnOption;
        admin: IColumnOption;
        advisor: IColumnOption;
    }
    export const attr: GroupModelTypes.IGroupScheme = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        admin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        advisor: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    };
}
