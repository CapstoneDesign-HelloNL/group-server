import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    ModelValidateOptions
} from "sequelize";
export namespace IntroducePhotoModelTypes {
    export interface IBaseIntroducePhotoTableOptions extends InitOptions {
        sequelize: Sequelize;
        tableName: string;
    }
    export interface IColumnOption {
        type: DataTypes.DataType;
        allowNull: boolean;
        validate?: ModelValidateOptions;
    }
    export interface IIntroducePhotoScheme extends ModelAttributes {
        url: IColumnOption;
        introduceId: IColumnOption;
    }
    export const attr: IntroducePhotoModelTypes.IIntroducePhotoScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        introduceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    };
}
