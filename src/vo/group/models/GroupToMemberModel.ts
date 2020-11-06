import {
    Sequelize,
    DataTypes,
    InitOptions,
    ModelAttributes,
    Model,
    ModelAttributeColumnOptions,
    ModelAttributeColumnReferencesOptions
} from "sequelize";
import Group from "@src/models/GroupModel";
import Member from "@src/models/MemberModel";

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
        references?: IForeignReferences;
    }
    export interface IGroupToMemberScheme extends ModelAttributes {
        groupId: IColumnOption;
        memberId: IColumnOption;
        memberRank: IColumnOption;
    }
    export const attr: GroupToMemberModelTypes.IGroupToMemberScheme = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Group",
                key: "id"
            }
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Member",
                key: "id"
            }
        },
        memberRank: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "member"
        }
    };
}
