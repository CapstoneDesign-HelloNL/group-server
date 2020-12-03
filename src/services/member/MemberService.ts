import Member from "@src/models/member/MemberModel";
import MemberDao from "@src/dao/member/MemberDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class MemberService {
    static findOne = serviceFactory.get<Member>(
        MemberDao.getInstance().findOne
    );
    static findAll = serviceFactory.getMany<Member>(
        MemberDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Member>(
        MemberDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Member>(
        MemberDao.getInstance().update
    );

    static delete = serviceFactory.delete<Member>(
        MemberDao.getInstance().delete
    );
}

export default MemberService;
