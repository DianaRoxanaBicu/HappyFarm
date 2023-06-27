import {HydratedDocument} from "mongoose";
import {AnimalType} from "../../database/schemas/animal";

export const mapAnimal = (animal: HydratedDocument<AnimalType>) => {
    return {
        id: animal._id,
        cnp: animal.cnp,
        specie: animal.specie,
        mass: animal.mass,
        birthday: animal.birthday,
        color: animal.color,
        price: animal.price,
        vaccinated: animal.vaccinated,
        race: animal.race,
        userId: animal.userId,
        _id: animal._id
    } as AnimalType;
}
