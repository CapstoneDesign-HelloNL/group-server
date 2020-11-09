import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace GroupGalleryModelTypes {
    export interface IBaseGroupGalleryTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        primaryKey?: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IGroupGalleryScheme extends ModelAttributes {
        name: IColumnOption;
        groupName: IColumnOption;
    }
    export const attr: GroupGalleryModelTypes.IGroupGalleryScheme = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    };
}
