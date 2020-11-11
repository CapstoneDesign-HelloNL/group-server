import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import ScheduleService from "@src/services/schedule/ScheduleService";
import resTypes from "@src/utils/resTypes";
import Schedule from "@src/models/schedule/ScheduleModel";

class FindOneController extends Controller {
    private result: Schedule | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await ScheduleService.findOne(req);
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
                resTypes.successRes(res, "Find schedule", this.result);
        }
    }
}

export default FindOneController;
