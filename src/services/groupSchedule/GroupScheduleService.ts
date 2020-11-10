import GroupSchedule from "@src/models/groupSchedule/GroupScheduleModel";
import GroupScheduleDao from "@src/dao/groupSchedule/GroupScheduleDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupScheduleService {
    static findAll = serviceFactory.get<GroupSchedule>(
        GroupScheduleDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupSchedule>(
        GroupScheduleDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupSchedule>(
        GroupScheduleDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupSchedule>(
        GroupScheduleDao.getInstance().delete
    );
}

export default GroupScheduleService;
