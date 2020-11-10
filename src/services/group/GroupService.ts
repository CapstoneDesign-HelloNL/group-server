import { Request } from "express";
import Group from "@src/models/group/GroupModel";
import Member from "@src/models/member/MemberModel";
import GroupDao from "@src/dao/group/GroupDao";
import { StrictReqData } from "@src/vo/group/services/reqData";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupService {
    static isAlreadyHaveGroup = serviceFactory.checkAlreadyHave<Group>(
        GroupDao.getInstance().find
    );

    static findAll = serviceFactory.get<Group>(GroupDao.getInstance().findAll);
    static findSignUp = serviceFactory.get<Member>(
        GroupDao.getInstance().findSignUp
    );
    static findByName = serviceFactory.get<Group>(
        GroupDao.getInstance().findByName
    );

    static create = serviceFactory.postOrUpdate<Group>(
        GroupDao.getInstance().save
    );

    static update = serviceFactory.postOrUpdate<Group>(
        GroupDao.getInstance().update
    );
    static delete = serviceFactory.delete<Group>(GroupDao.getInstance().delete);
}

export default GroupService;
