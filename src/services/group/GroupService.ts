import Group from "@src/models/group/GroupModel";
// import Member from "@src/models/member/MemberModel";
import Member from "@src/models/member/MemberModel";
import GroupDao from "@src/dao/group/GroupDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupService {
    static findOne = serviceFactory.get<Group>(GroupDao.getInstance().findOne);
    static findAll = serviceFactory.getMany<Group>(
        GroupDao.getInstance().findAll
    );
    static findSignUp = serviceFactory.get<Member>(
        GroupDao.getInstance().findSignUp
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
