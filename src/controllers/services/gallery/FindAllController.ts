import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryService from "@src/services/gallery/GalleryService";
import resTypes from "@src/utils/resTypes";
import Gallery from "@src/models/gallery/GalleryModel";

class FindAllController extends Controller {
    private result: Gallery[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GalleryService.findAll(req);
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
                resTypes.cannotFindItemRes(res, "gallery");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find all gallery", this.result);
        }
    }
}

export default FindAllController;
