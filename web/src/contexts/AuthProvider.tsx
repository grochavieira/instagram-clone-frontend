import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

import IUser from "../interfaces/IUser";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn({ email, password }: any): Promise<object>;
  signOut(): void;
  updateUser(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem("@instagram-clone-user");
      const storagedToken = localStorage.getItem("@instagram-clone-token");

      if (storagedUser && storagedToken) {
        try {
          const parsedToken = JSON.parse(storagedToken);
          jwt.verify(
            parsedToken,
            process.env.REACT_APP_TOKEN_SECRET || "",
            (err: any, decoded: any) => {
              if (err) {
                signOut();
              } else {
                api.defaults.headers.Authorization = `Bearer ${parsedToken}`;
                setUser(JSON.parse(storagedUser));
                setToken(parsedToken);
              }
            }
          );
        } catch (err) {}
      }
    }

    loadStoragedData();
  }, []);

  async function updateUser() {
    try {
      if (user) {
        const { data } = await api.get(`/user/${user.username}`);

        console.log(data);
        setUser(data);

        localStorage.setItem("@instagram-clone-user", JSON.stringify(data));
      }

      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }

  async function signIn({ username, password }: any) {
    try {
      const { data } = await api.post("/user/login", { username, password });

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      toast.success("Login efetuado com sucesso!");

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("@instagram-clone-user", JSON.stringify(data.user));
      localStorage.setItem(
        "@instagram-clone-token",
        JSON.stringify(data.token)
      );
      return { success: true };
    } catch (err) {
      toast.error("não foi possível efetuar o login!");
      const { errors: responseErrors } = err.response.data;
      return { responseErrors };
    }
  }

  async function signOut() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("@instagram-clone-user");
    localStorage.removeItem("@instagram-clone-token");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
