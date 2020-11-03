import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GroupAgendaService from "@src/services/groupAgenda/GroupAgendaService";
import resTypes from "@src/utils/resTypes";

class GroupAgendaCreateController extends Controller {
    private result: string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GroupAgendaService.create(req, res, next);
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
                resTypes.successRes(res, "Create group agenda");
        }
    }
}

export default GroupAgendaCreateController;
