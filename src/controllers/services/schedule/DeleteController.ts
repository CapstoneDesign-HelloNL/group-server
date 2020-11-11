import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import ScheduleService from "@src/services/schedule/ScheduleService";
import resTypes from "@src/utils/resTypes";

class UpdateController extends Controller {
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
        this.result = await ScheduleService.delete(req);
        console.log(this.result);
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
            case "AlreadyExistItem":
                resTypes.alreadyExistItemRes(res, "schedule");
                break;
            case "NoItemDeleted":
                resTypes.noItemDeletedRes(res, "schedule");
                break;
            default:
                resTypes.successRes(res, "Delete schedule");
        }
    }
}

export default UpdateController;
