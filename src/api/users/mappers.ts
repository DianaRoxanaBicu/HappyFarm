import {User, UserType} from "../../database/schemas/user";
import {HydratedDocument} from "mongoose";

export const mapUser = (user: HydratedDocument<UserType>) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    }
}
