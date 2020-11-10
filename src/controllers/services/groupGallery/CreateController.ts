import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GroupGalleryService from "@src/services/groupGallery/GroupGalleryService";
import resTypes from "@src/utils/resTypes";

class CreateController extends Controller {
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
        this.result = await GroupGalleryService.create(req);
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
                resTypes.alreadyExistItemRes(res, "group agenda");
                break;
            default:
                resTypes.successRes(res, "Create group agenda");
        }
    }
}

export default CreateController;
