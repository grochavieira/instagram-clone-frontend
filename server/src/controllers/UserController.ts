import { Request, Response } from "express";
import UserModel from "../models/UserModel";

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
    const { name, email, username, password } = request.body;

    console.log(name);

    const dataResponse = await UserModel.create({
      name,
      email,
      username,
      password,
    });

    response.json(dataResponse);
  }
}

export default UserController;
