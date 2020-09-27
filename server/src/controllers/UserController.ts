import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import uploadImage from "../helpers/helpers";

class UserController {
  async index(request: Request, response: Response) {
    const users = await UserModel.find();

    response.json(users);
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email, password });

    response.json(user);
  }

  async store(request: Request, response: Response) {
    try {
      const myFile = request.file;
      const { name, email, username, password } = request.body;

      const profilePhotoUrl = await uploadImage(myFile);

      console.log(name);

      const dataResponse = await UserModel.create({
        name,
        email,
        username,
        password,
        profilePhotoUrl,
      });

      response.json(dataResponse);
    } catch (e) {
      response.status(404).json({
        message: "Unable to create user",
      });
    }
  }
}

export default UserController;
