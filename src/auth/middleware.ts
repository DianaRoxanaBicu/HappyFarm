import jwt from "jsonwebtoken";
import {NextFunction} from "express";

export const authMiddleware = (request: any, response: any, next: NextFunction) => {
    try {
        const token = request.header("accessToken");

        const verified = jwt.verify(token || "", "ok") as {id?: string}
        if (verified) {
            response.locals.id = verified.id || "";
            console.log(verified.id)
            return next();
        } else {
            // Access Denied
            return response.status(401).send("Neautentificat");
        }
    } catch (error) {
        // Access Denied
        return response.status(401).send("Neautentificat");
    }

}
