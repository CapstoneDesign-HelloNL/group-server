import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import AgendaService from "@src/services/agenda/AgendaService";
import resTypes from "@src/utils/resTypes";
import Agenda from "@src/models/agenda/AgendaModel";

class FindAllController extends Controller {
    private result: Agenda[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await AgendaService.findAll(req);
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
                resTypes.successRes(res, "Find all agenda", this.result);
        }
    }
}

export default FindAllController;
