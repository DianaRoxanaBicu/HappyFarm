import {Router} from "express";
import {createAnimal, deleteAnimal, getAnimalById, updateAnimal} from "../../database/repos/animals";
import {authMiddleware} from "../../auth/middleware";
import {AnimalType} from "../../database/schemas/animal";
import {mapAnimal} from "./mappers";


const animalRouter = Router();

animalRouter.use(authMiddleware);

animalRouter.get("/", async (request, response) => {
    const animals = await getAnimalById(response.locals.id);

    response.send({
        animals,
    });
});

animalRouter.post("/", async (request, response) => {
    const {animal: {cnp, specie, race, mass, birthday, color, price, vaccinated}} = request.body as {
        animal: AnimalType
    };
    if (cnp === undefined || specie === undefined || race === undefined || mass === undefined || birthday === undefined || color === undefined || price === undefined || vaccinated === undefined) {
        response.status(400).send("BadRequest");
        return
    }

    try {
        const animal = await createAnimal({
            cnp,
            specie,
            race,
            mass,
            birthday,
            color,
            price,
            vaccinated,
            userId: response.locals.id
        });
        response.send({
            animal: mapAnimal(animal),
        });
    } catch (error) {
        console.log(error)
        response.status(500).send("Internal Server Error");
    }
});

animalRouter.put("/", async (request, response) => {
    const {animal} = request.body as {
        animal: AnimalType
    };
    if (animal === undefined) {
        response.status(400).send("BadRequest");
        return
    }

    try {
        const updatedAnimal = await updateAnimal(animal);

        if (updatedAnimal === null) {
            response.status(404).send("NotFound");
            return
        }

        response.send({
            animal: mapAnimal(updatedAnimal),
        });
    } catch (error) {
        console.log(error)
        response.status(500).send("Internal Server Error");
    }
});

animalRouter.delete("/", async (request, response) => {
    const {animal} = request.body as {
        animal: AnimalType
    };
    if (animal === undefined) {
        response.status(400).send("BadRequest");
        return
    }

    try {
        const deletedAnimal = await deleteAnimal(animal);

        if (deletedAnimal === null) {
            response.status(404).send("NotFound");
            return
        }

        response.send({
            animal: mapAnimal(deletedAnimal)
        });
    } catch (error) {
        console.log(error)
        response.status(500).send("Internal Server Error");
    }
});

export default animalRouter;
