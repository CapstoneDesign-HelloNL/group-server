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
        try {
            // if (!groupBody.content) return "BadRequest";
            const result = await daoFunc(reqData);
            switch (result) {
                case undefined:
                    return "InternalServerError";
                case null:
                    return "UnexpectedError";
                default:
                    return result;
            }
        } catch (e) {
            console.log(e);
            return "InternalServerError";
        }
    };
    return funcName;
};

export default serviceFactory;
