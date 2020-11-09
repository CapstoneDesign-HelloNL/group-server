/* eslint-disable @typescript-eslint/await-thenable */
import jwt, { TokenExpiredError } from "jsonwebtoken";

class JwtService {
    static async verifyToken(token): Promise<string | unknown | undefined> {
        let validToken: string | unknown | undefined = "";
        try {
            validToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                validToken = "ExpiredToken";
            } else {
                validToken = "InvalidToken";
            }
        }
        return validToken;
    }

    static async decodeToken(
        token
    ): Promise<{ [key: string]: any } | string | null> {
        return await jwt.decode(token);
    }
}
export default JwtService;
