import {response, Router} from "express";
import {createUser, deleteUser, getUserByEmail} from "../../database/repos/users";
import {mapUser} from "./mappers";
import {createAccesToken} from "../login";
import {authMiddleware} from "../../auth/middleware";
import {User} from "../../database/schemas/user";

const userRouter = Router();

userRouter.get("/", authMiddleware, async (request, response) => {
    const user = await User.findOne({_id: response.locals.id});
    if (!user) {
        response.status(400).send("Nu exista utilizatorul");
        return
    }


    response.send({
        user: mapUser(user),
    });
});

userRouter.post("/", async (request, response) => {
    const {email, password, name} = request.body;
    if (!email || !password || !name) {
        response.status(400).send("Nu este bine")
        return

    }
    const user = await createUser({email, password, name});
    response.send({
        user: mapUser(user),
        accessToken: createAccesToken(user)
    });
});

userRouter.post("/login", async (request, response) => {
    const {email, password} = request.body;
    const user = await getUserByEmail(email);
    if (!user) {
        response.status(400).send("Utilizatorul nu a fost găsit")
        return
    }
    if (user.password !== password) {
        response.status(400).send("Parola incoreectă")
        return
    }

    response.send({
        user: mapUser(user),
        accessToken: createAccesToken(user)
    });


})

userRouter.delete("/", async (request, response) => {
    const {password} = request.body;
    if (!password) {
        response.status(400).send("Parola incoreectă")
        return
    }
    deleteUser("id", password);
});
userRouter.put("/name", authMiddleware, async (request,response)=>{
    const {name} = request.body;
    if (!name) {
        response.status(400).send("Nu exista nume")
        return
    }

    const user = await User.findOneAndUpdate({_id: response.locals.id}, {name}, {new: true})

    if (!user) {
        response.status(400).send("Nu exista utilizatorul");
        return
    }

    response.send({
        user: mapUser(user),
    });
})
userRouter.put("/email", authMiddleware, async (request,response)=>{
    const {email} = request.body;
    if (!email) {
        response.status(400).send("Nu exista email")
        return
    }

    const user = await User.findOneAndUpdate({_id: response.locals.id}, {email}, {new: true})
    if (!user) {
        response.status(400).send("Nu exista utilizatorul");
        return
    }

    response.send({
        user: mapUser(user),
    });
})

userRouter.put("/password", authMiddleware, async (request,response)=>{
    const {password} = request.body;
    if (!password) {
        response.status(400).send("Nu exista parola")
        return
    }
    const user = await User.findOneAndUpdate({_id: response.locals.id}, {password}, {new: true})
    if (!user) {
        response.status(400).send("Nu exista utilizatorul");
        return
    }

    response.send({
        user: mapUser(user),
    });
})
export default userRouter;
