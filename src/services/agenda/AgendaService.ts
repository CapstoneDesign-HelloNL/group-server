import Agenda from "@src/models/agenda/AgendaModel";
import AgendaDao from "@src/dao/agenda/AgendaDao";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

class AgendaService {
    static findOne = serviceFactory.get<Agenda>(
        AgendaDao.getInstance().findOne
    );
    static findAll = serviceFactory.getMany<Agenda>(
        AgendaDao.getInstance().findAll
    );
    static create = serviceFactory.postOrUpdate<Agenda>(
        AgendaDao.getInstance().save
    );
    static update = serviceFactory.postOrUpdate<Agenda>(
        AgendaDao.getInstance().update
    );

    static delete = serviceFactory.delete<Agenda>(
        AgendaDao.getInstance().delete
    );
}

export default AgendaService;
