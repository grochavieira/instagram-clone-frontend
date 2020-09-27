import { Router } from "express";
import multer from "multer";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const routes = Router();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const userController = new UserController();
const postController = new PostController();

routes.get("/user", userController.index);
routes.post("/user/login", userController.login);
routes.post("/user", multerMid.single("file"), userController.store);

routes.get("/user/posts", postController.index);
routes.get("/user/posts/:id", postController.show);
routes.get("/user/post/:id", postController.details);
routes.post("/user/post/:id", multerMid.single("file"), postController.create);

export default routes;
