import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions,
    ModelAttributeColumnReferencesOptions,
    Model
} from "sequelize";
export namespace PostModelTypes {
    export interface IBasePostTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IForeignReferences
        extends ModelAttributeColumnReferencesOptions {
        model: string | typeof Model;
        key: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        onDelete?: string;
        onUpdate?: string;
        foreignKey?: string;
        validate?: ModelValidateOptions;
        references?: IForeignReferences;
    }
    export interface IPostScheme extends ModelAttributes {
        title: IColumnOption;
        content: IColumnOption;
        author: IColumnOption;
        galleryName: IColumnOption;
        groupName: IColumnOption;
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
            // onDelete: "CASCADE",
            // onUpdate: "CASCADE",
            // references: {
            //     model: "Gallery",
            //     key: "name"
            // }
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
            // onDelete: "CASCADE",
            // onUpdate: "CASCADE",
            // references: {
            //     model: "Gallery",
            //     key: "groupName"
            // }
        }
    };
}
