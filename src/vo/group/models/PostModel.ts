import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace PostModelTypes {
    export interface IBasePostTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IPostScheme extends ModelAttributes {
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
        galleryName: IColumnOption;
    }
    export const attr: PostModelTypes.IPostScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        galleryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    };
}
