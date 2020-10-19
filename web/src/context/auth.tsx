import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  trigger: true,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  trigger: true,
  login: (userData: any) => {},
  logout: () => {},
  triggerEvent: (value: boolean) => {},
});

function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "TRIGGER_EVENT":
      return {
        ...state,
        trigger: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData: any) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  function triggerEvent(value: boolean) {
    dispatch({
      type: "TRIGGER_EVENT",
      payload: value,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        triggerEvent,
        trigger: state.trigger,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
