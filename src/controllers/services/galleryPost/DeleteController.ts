import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryPostService from "@src/services/galleryPost/GalleryPostService";
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
        this.result = await GalleryPostService.delete(req);
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
            case "NoItemDeleted":
                resTypes.noItemDeletedRes(res, "gallery post");
                break;
            default:
                resTypes.successRes(res, "Delete gallery post");
        }
    }
}

export default UpdateController;
