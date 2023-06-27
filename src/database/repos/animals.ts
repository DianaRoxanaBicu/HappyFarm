import {Animal, AnimalType} from "../schemas/animal";

export const createAnimal = (animal: AnimalType) => {
    const a = new Animal(animal);
    return a.save();
}

export const getAnimals = () => {
    return Animal.find();
}

export const getAnimalById = (id: string) => {
    return Animal.find().where('id').equals(id);
}

export const updateAnimal = (animal: AnimalType) => {
    return Animal.findOneAndUpdate({_id: animal.id}, animal, {new: true});
}

export const deleteAnimal = (animal: AnimalType) => {
    return Animal.findOneAndDelete({_id: animal.id});
}
