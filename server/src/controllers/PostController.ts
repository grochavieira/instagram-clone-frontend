import { Request, Response } from "express";
import PostModel from "../models/PostModel";
import uploadImage from "../helpers/helpers";

class PostController {
  async index(request: Request, response: Response) {
    try {
      const posts = await PostModel.find();

      response.json(posts);
    } catch (e) {
      response.status(404).json({ message: "Unable to Get Images" });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id: user_id } = request.params;
      const posts = await PostModel.find({ user_id });

      if (!posts) {
        response.json({ message: "User don't exist" });
      }

      response.json(posts);
    } catch (e) {
      response.status(404).json({ message: "Unable to Get Images" });
    }
  }

  async details(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const post = await PostModel.findById(id);

      if (!post) {
        response.json({ message: "Post don´t exist" });
      }

      response.json(post);
    } catch (e) {
      response.status(404).json({ message: "Unable to Get Post." });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const myFile = request.file;
      const { id: user_id } = request.params;

      const imageUrl = await uploadImage(myFile);

      console.log(request.body);
      console.log(user_id);

      const post = await PostModel.create({
        user_id,
        imageUrl,
      });

      response.status(200).json({
        post,
      });
    } catch (e) {
      response.status(404).json({ message: "Unable to upload" });
    }
  }
}

export default PostController;
