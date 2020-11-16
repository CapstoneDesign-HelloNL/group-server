import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import AgendaService from "@src/services/agenda/AgendaService";
import resTypes from "@src/utils/resTypes";
import Agenda from "@src/models/agenda/AgendaModel";

class FindOneController extends Controller {
    private result: Agenda | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await AgendaService.findOne(req);
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
            case "CannotFindItem":
                resTypes.cannotFindItemRes(res, "agenda");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find agenda", this.result);
        }
    }
}

export default FindOneController;
