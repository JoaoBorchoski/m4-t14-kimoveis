import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import {
    usersRouter,
    loginRouter,
    categoriesRouter,
    realEstateRouter,
    shedulesRouter,
} from "./routers";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstateRouter);
app.use("/schedules", shedulesRouter);

app.use(handleErrors);

export default app;
