import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GroupAgendaService from "@src/services/groupAgenda/GroupAgendaService";
import resTypes from "@src/utils/resTypes";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";

class FindAllByGroupNameController extends Controller {
    private result: GroupAgenda[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GroupAgendaService.findAllByName(req);
    }
    protected async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        switch (this.result) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find All Group Agenda", this.result);
        }
    }
}

export default FindAllByGroupNameController;
