import React from "react";
import PropTypes from "prop-types";
import authReducer from "../reducers/auth";

const AuthStateContext = React.createContext(); //holds the current state of the authentication
const AuthDispatchContext = React.createContext(); //holds the function to update the authentication state.


const token = JSON.parse(localStorage.getItem("authToken"));
const email = JSON.parse(localStorage.getItem("authEmail"));
const initialState = {
  isLoggedIn: !!token,
  authToken: token ? token : null,
  authEmail: email ? email : null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
//hooks allow child components to access the state and dispatch functions respectively.
const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

//hooks allow child components to access the state and dispatch functions respectively.
const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

// hook returns both the state and dispatch functions as an array.
const useAuth = () => {
  return [useAuthState(), useAuthDispatch()];
};

//PropTypes is used for typechecking the children prop passed to AuthProvider.
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
