import { Request } from "express";
import ReqData from "@src/vo/group/services/reqData";
import Dao from "@src/dao/Dao";

const serviceFactory = <T>(
    funcName: string | Function,
    dao: typeof Dao,
    daoFunc: Function
) => {
    funcName = async (req: Request): Promise<T | string> => {
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };

        // if (!groupBody.content) return "BadRequest";
        const result = await dao.getInstance().daoFunc(reqData);
        switch (result) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            default:
                return result;
        }
    };
    return funcName;
};

export default serviceFactory;
