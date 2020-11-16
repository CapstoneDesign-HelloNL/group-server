import GroupDBManager from "@src/models/GroupDBManager";
import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { AllStrictReqData } from "@src/vo/group/services/reqData";
import { ValidationError } from "sequelize";

const logger = LogService.getInstance();
class GroupToMemberDao extends Dao {
    protected constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    async findOne({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<GroupToMember | string | null | undefined> {
        let groupToMember: GroupToMember | null = null;
        try {
            groupToMember = await GroupToMember.findOne({
                where: {
                    groupName: params.groupName,
                    memberEmail: params.memberEmail,
                    memberRank: data.memberRank
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return groupToMember;
    }

    async findAll({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<GroupToMember[] | string | null | undefined> {
        let groupToMembers: GroupToMember[] | null = null;
        try {
            groupToMembers = await GroupToMember.findAll();
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return groupToMembers;
    }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<GroupToMember | string | null | undefined> {
        let newGroupToMember: GroupToMember | null = null;
        try {
            newGroupToMember = await GroupToMember.create({
                groupName: params.groupName,
                memberEmail: params.memberEmail,
                memberRank:
                    data.memberRank !== undefined ? data.memberRank : "일반회원"
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return newGroupToMember;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateGroupToMember: unknown | null = null;
        try {
            updateGroupToMember = await GroupToMember.update(
                { ...data },
                { where: { memberEmail: data.memberEmail } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return updateGroupToMember;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteGroupToMember: number | null = null;
        try {
            deleteGroupToMember = await GroupToMember.destroy({
                where: {
                    groupName: params.groupName,
                    memberEmail: params.memberEmail
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return deleteGroupToMember; //1 is success, 0 or undefined are fail
    }
}

export default GroupToMemberDao;
