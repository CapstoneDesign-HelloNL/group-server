import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryPhotoService from "@src/services/galleryPhoto/GalleryPhotoService";
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
        this.result = await GalleryPhotoService.delete(req);
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
                resTypes.noItemDeletedRes(res, "gallery photo");
                break;
            default:
                resTypes.successRes(res, "Delete gallery photo");
        }
    }
}

export default UpdateController;
