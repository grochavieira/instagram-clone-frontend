import { Router } from "express";
import UserController from "./controllers/UserController";
const routes = Router();

const userController = new UserController();

routes.get("/user", userController.index);
routes.get("/user/login", userController.login);
routes.post("/user", userController.store);

export default routes;
