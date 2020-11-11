import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryService from "@src/services/gallery/GalleryService";
import resTypes from "@src/utils/resTypes";
import Gallery from "@src/models/gallery/GalleryModel";

class FindOneController extends Controller {
    private result: Gallery | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GalleryService.findOne(req);
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
                resTypes.successRes(res, "Find gallery", this.result);
        }
    }
}

export default FindOneController;
