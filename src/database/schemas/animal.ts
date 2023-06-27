import mongoose, {model, Schema} from "mongoose";

export type AnimalType  = {
    id?: string
    _id?: string
    userId: Schema.Types.ObjectId
    cnp: string
    race: string
    specie: string
    mass: number
    birthday: Date
    color: string
    price: number
    vaccinated: string
}
const animalSchema = new Schema<AnimalType>({
    userId: {type: Schema.Types.ObjectId, required: true},
    cnp: { type: String, required: true },
    race: {type: String, required: true},
    specie: {type: String, required: true},
    mass: {type: Number, required: true},
    birthday: {type: Date, required: true},
    color: {type: String, required: true},
    price: {type: Number, required: true},
    vaccinated: {type: String, required: true},
});

export const Animal = model<AnimalType>('Animal', animalSchema);
