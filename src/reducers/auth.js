const authReducer = (state, { type, payload }) => {
  switch (type) {
    //When the "LOGIN" action is dispatched, the reducer updates the authentication state in the Redux store by setting the "authToken"
    // and "authEmail" keys in localStorage to the JSON stringified payload values for auth_token and email respectively. It also sets the isLoggedIn state to true.
    case "LOGIN": {
      localStorage.setItem("authToken", JSON.stringify(payload.auth_token));
      localStorage.setItem("authEmail", JSON.stringify(payload.email));
      return {
        isLoggedIn: true,
        authToken: payload.auth_token,
        authEmail: payload.email,
      };
    }
    //When the "LOGOUT" action is dispatched, the reducer clears the authToken, authEmail,
    // and currentUser keys in localStorage, and sets the isLoggedIn state to false.
    case "LOGOUT": {
      localStorage.setItem("authToken", JSON.stringify(null));
      localStorage.setItem("authEmail", JSON.stringify(null));
      localStorage.setItem("currentUser", JSON.stringify(null));
      return { isLoggedIn: false, authToken: null, authEmail: null };
    }
    //If the reducer receives an action with a type that it doesn't recognize,
    // it will throw an error with a message indicating that the action type is unhandled.
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default authReducer;
