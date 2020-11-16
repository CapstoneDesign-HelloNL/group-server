import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryPhotoService from "@src/services/galleryPhoto/GalleryPhotoService";
import resTypes from "@src/utils/resTypes";
import GalleryPhoto from "@src/models/galleryPhoto/GalleryPhotoModel";

class FindAllController extends Controller {
    private result: GalleryPhoto[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GalleryPhotoService.findAll(req);
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
                resTypes.cannotFindItemRes(res, "gallery photo");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find all gallery photo", this.result);
        }
    }
}

export default FindAllController;
