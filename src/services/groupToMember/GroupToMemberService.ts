import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";
import GroupToMemberDao from "@src/dao/groupToMember/GroupToMemberDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupToMemberService {
    static findOne = serviceFactory.get<GroupToMember>(
        GroupToMemberDao.getInstance().findOne
    );
    static findAll = serviceFactory.get<GroupToMember>(
        GroupToMemberDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupToMember>(
        GroupToMemberDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupToMember>(
        GroupToMemberDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupToMember>(
        GroupToMemberDao.getInstance().delete
    );
}

export default GroupToMemberService;
