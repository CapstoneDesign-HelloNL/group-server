import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import NoticeService from "@src/services/notice/NoticeService";
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
        this.result = await NoticeService.update(req);
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
                resTypes.alreadyExistItemRes(res, "notice");
                break;
            default:
                resTypes.successRes(res, "Create notice");
        }
    }
}

export default UpdateController;
