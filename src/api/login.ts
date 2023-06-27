import jwt from "jsonwebtoken"
import {UserType} from "../database/schemas/user";

export const createAccesToken = (user:UserType)=>{
    return jwt.sign({
        id: user._id
    },"ok")

}
