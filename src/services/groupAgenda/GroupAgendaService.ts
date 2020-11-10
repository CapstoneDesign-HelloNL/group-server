import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupAgendaDao from "@src/dao/groupAgenda/GroupAgendaDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class GroupAgendaService {
    static findAllByName = serviceFactory.get<GroupAgenda[]>(
        GroupAgendaDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<GroupAgenda>(
        GroupAgendaDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<GroupAgenda>(
        GroupAgendaDao.getInstance().update
    );

    static delete = serviceFactory.delete<GroupAgenda>(
        GroupAgendaDao.getInstance().delete
    );
}

export default GroupAgendaService;
