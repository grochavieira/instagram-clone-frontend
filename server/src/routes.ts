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

// USER ROUTES
routes.get("/users/:username", loginRequired, userController.index);
routes.get("/user/:id", userController.show);
routes.post("/user/login", userController.login);
routes.post("/user", multerMid.single("file"), userController.store);

// POST ROUTES
routes.get("/post", loginRequired, postController.index);
routes.get("/post/:id", postController.show);
routes.get("/posts", loginRequired, postController.search);
routes.post(
  "/post",
  loginRequired,
  multerMid.single("file"),
  postController.create
);
routes.delete("/post/:id", loginRequired, postController.delete);

// LIKE ROUTES
routes.post("/post/like/:id", loginRequired, postController.like);

// FOLLOW ROUTES
routes.post("/follow", loginRequired, userController.follow);

// COMMENTS ROUTES
routes.post("/comment/:id", loginRequired, commentsController.create);
routes.delete("/comment/:id", loginRequired, commentsController.delete);

export default routes;
