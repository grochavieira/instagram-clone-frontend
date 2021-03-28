import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn({ email, password }: any): Promise<object>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = localStorage.getItem("@instagram-clone-user");
      const storagedToken = localStorage.getItem("@instagram-clone-token");

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(
          storagedToken
        )}`;

        setUser(JSON.parse(storagedUser));
        setToken(JSON.parse(storagedToken));
      }
    }

    loadStoragedData();
  }, []);

  async function signIn({ username, password }: any) {
    try {
      const { data } = await api.post("/user/login", { username, password });

      toast.success("Login efetuado com sucesso!");
      console.log(data.user);
      setUser(data.user);
      setToken(data.token);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

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
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
