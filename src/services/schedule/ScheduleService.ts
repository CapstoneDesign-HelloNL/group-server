import Schedule from "@src/models/schedule/ScheduleModel";
import ScheduleDao from "@src/dao/schedule/ScheduleDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class ScheduleService {
    static findOne = serviceFactory.get<Schedule>(
        ScheduleDao.getInstance().findOne
    );
    static findAll = serviceFactory.getMany<Schedule>(
        ScheduleDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Schedule>(
        ScheduleDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Schedule>(
        ScheduleDao.getInstance().update
    );

    static delete = serviceFactory.delete<Schedule>(
        ScheduleDao.getInstance().delete
    );
}

export default ScheduleService;
