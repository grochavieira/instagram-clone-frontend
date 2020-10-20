import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import uploadImage from "../helpers/helpers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import credentials from "../credentials";
import { validateRegisterInput, validateLoginInput } from "../util/validators";

const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      profilePhotoUrl: user.profilePhotoUrl,
      friends: user.friends,
    },
    credentials.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

class UserController {
  async index(request: any, response: Response) {
    const { username } = request;
    const usernameRegexp = new RegExp("^" + request.params.username);
    const users: any = await UserModel.find({ username: usernameRegexp });

    const filteredUsers = users.filter(
      (user: any) => user.username !== username
    );

    response.json(filteredUsers);
  }

  async show(request: Request, response: Response) {
    const { id: userId } = request.params;
    const user = await UserModel.findById(userId);

    if (!user) {
      return response
        .status(400)
        .json({ errors: { user: "Esse usuário não existe" } });
    }

    return response.status(200).json(user);
  }

  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;

      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) return response.status(400).json({ errors });

      const user: any = await UserModel.findOne({ username });

      if (!user) {
        errors.general = "Nome de usuário não existe";
        return response.status(400).json({ errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Senha incorreta";
        return response.status(400).json({ errors });
      }

      const token = generateToken(user);

      response.status(200).json({
        ...user._doc,
        id: user._id,
        token,
      });
    } catch (err) {
      console.log(err);
      response.status(404).json({
        errors: {
          message: "Não foi possível logar",
        },
      });
    }
  }

  async store(request: Request, response: Response) {
    try {
      const profilePhoto = request.file;
      const { name, email, username, password, confirmPassword } = request.body;

      const { valid, errors } = validateRegisterInput(
        name,
        profilePhoto,
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) return response.status(400).json({ errors });

      const profilePhotoUrl = await uploadImage(profilePhoto);

      const user = await UserModel.findOne({ username });
      if (user) {
        return response.status(400).json({
          errors: {
            username: "Nome de usuário já existe",
          },
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new UserModel({
        name,
        email,
        username,
        password: passwordHash,
        profilePhotoUrl,
      });

      const result: any = await newUser.save();

      const token = generateToken(result);

      return response.status(200).json({
        ...result._doc,
        id: result._id,
        token,
      });
    } catch (err) {
      console.log(err);
      response.status(404).json({
        errors: {
          message: "Não foi possível criar o usuário",
        },
      });
    }
  }

  async follow(request: any, response: Response) {
    try {
      const { username } = request;
      const { friendUsername } = request.body;

      const user: any = await UserModel.findOne({ username });

      if (!user) {
        return response.status(400).json({
          errors: {
            message: "Usuário não existe",
          },
        });
      }

      if (
        user.friends.find((friend: any) => friend.username === friendUsername)
      ) {
        user.friends = user.friends.filter(
          (friend: any) => friend.username !== friendUsername
        );
      } else {
        const currentDate = new Date();
        user.friends.push({
          username: friendUsername,
          createdAt: String(currentDate),
        });
      }

      await user.save();

      return response.status(200).json(user);
    } catch (err) {
      console.log(err);
      response.status(404).json({
        errors: {
          message: "Não foi possível seguir o usuário",
        },
      });
    }
  }
}

export default UserController;
