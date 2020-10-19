import { Router } from "express";
import multer from "multer";

import loginRequired from "./middlewares/loginRequired";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";
import CommentsController from "./controllers/CommentsController";

const routes = Router();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const userController = new UserController();
const postController = new PostController();
const commentsController = new CommentsController();

routes.get("/user", userController.index);
routes.post("/user/login", userController.login);
routes.post("/user", multerMid.single("file"), userController.store);

routes.get("/user/post", postController.index);
routes.get("/user/post/:id", postController.show);
routes.post(
  "/user/post",
  loginRequired,
  multerMid.single("file"),
  postController.create
);
routes.delete("/user/post/:id", loginRequired, postController.delete);
routes.post("/user/post/like/:id", loginRequired, postController.like);

routes.post("/user/post/comment/:id", loginRequired, commentsController.create);
routes.delete(
  "/user/post/comment/:id",
  loginRequired,
  commentsController.delete
);

export default routes;
