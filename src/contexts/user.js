import React from "react";
import PropTypes from "prop-types";

import userReducer from "../reducers/user";

const UserStateContext = React.createContext(); //holds the current state of the user.
const UserDispatchContext = React.createContext(); //holds the function to update the user state.

const user = JSON.parse(localStorage.getItem("currentUser"));
const initialState = { user: user ? user : null };

//component sets up the initial state of the user and provides the state and dispatch functions to the child components using the created contexts.
const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

//hooks allow child components to access the state and dispatch functions respectively,
// and useUser() hook returns both the state and dispatch functions as an array.
const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

//hooks allow child components to access the state and dispatch functions respectively,
// and useUser() hook returns both the state and dispatch functions as an array.
const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

const useUser = () => {
  return [useUserState(), useUserDispatch()];
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export { UserProvider, useUserState, useUserDispatch, useUser };
