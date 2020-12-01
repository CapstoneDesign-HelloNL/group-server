import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    Model,
    ModelAttributeColumnReferencesOptions,
    ModelValidateOptions
} from "sequelize";

export namespace GroupToMemberModelTypes {
    export interface IBaseGroupToMemberTableOptions extends InitOptions {
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
        defaultValue?: any;
        primaryKey?: boolean;
        onDelete?: string;
        onUpdate?: string;
        validate?: ModelValidateOptions;
        references?: IForeignReferences;
    }
    export interface IGroupToMemberScheme extends ModelAttributes {
        groupName: IColumnOption;
        memberEmail: IColumnOption;
        memberRank: IColumnOption;
    }
    export const attr: GroupToMemberModelTypes.IGroupToMemberScheme = {
        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            validate: {
                notEmpty: true
            },
            references: {
                model: "Group",
                key: "name"
            }
        },
        memberEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        memberRank: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["일반회원", "임원진", "관리자"]],
                notEmpty: true
            },
            defaultValue: "일반회원"
        }
    };
}
