import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import credentials from "../credentials";

export default async (request: any, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({
      errors: {
        general: "É preciso fazer login",
      },
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data: any = jwt.verify(token, credentials.SECRET_KEY);
    const { id, name, email, username } = data;

    const user = await UserModel.findOne({
      username,
    });

    if (!user) {
      return response.status(401).json({
        errors: {
          username: "Usuário inválido",
        },
      });
    }

    request.id = id;
    request.name = name;
    request.email = email;
    request.username = username;
    return next();
  } catch (err) {
    return response.status(401).json({
      errors: {
        general: "Token expirado ou inválido",
      },
    });
  }
};
