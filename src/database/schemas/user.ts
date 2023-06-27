import mongoose, {model, Schema} from "mongoose";

export type UserType = {
    _id?: string
    name: string
    email: string
    password: string
}

const userSchema = new Schema<UserType>({
    // _id: {type: String, required: false}, nu merge daca punem asta
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

export const User = model<UserType>('User', userSchema);
