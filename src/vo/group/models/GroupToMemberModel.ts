import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    Model,
    ModelAttributeColumnReferencesOptions
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
        references?: IForeignReferences;
    }
    export interface IGroupToMemberScheme extends ModelAttributes {
        id: IColumnOption;
        groupName: IColumnOption;
        memberEmail: IColumnOption;
        memberRank: IColumnOption;
    }
    export const attr: GroupToMemberModelTypes.IGroupToMemberScheme = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Group",
                key: "name"
            }
        },
        memberEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Member",
                key: "email"
            }
        },
        memberRank: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "member"
        }
    };
}
