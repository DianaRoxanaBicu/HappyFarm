import {User, UserType} from "../schemas/user";

export const createUser = (user: UserType) => {
    const u = new User(user);
    return u.save();
}

export const getUserByEmail = (email: string) => {
    return User.findOne().where('email').equals(email);
}

export const updateUser = (userId: string, user: UserType) => {
    return User.updateOne({id: userId}, user);
}

export const deleteUser = (userId: string, password: string) => {
    return User.deleteOne({id: userId, password: password})
}









