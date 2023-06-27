import {Router} from "express";
import userRouter from "./api/users/router";
import animalRouter from "./api/animals/router";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/animals", animalRouter);

export default apiRouter;
