const userReducer = (state, { type, payload }) => {
  switch (type) {
    //When this action is dispatched, the reducer updates the user state in the Redux store by setting the "currentUser" key in localStorage to the JSON stringified payload user object,
    // and returning a new state object with the updated user object.
    case "SET_USER": {
      localStorage.setItem("currentUser", JSON.stringify(payload.user));
      return {
        user: payload.user,
      };
    }
    //If the reducer receives an action with a type that it doesn't recognize,
    // it will throw an error with a message indicating that the action type is unhandled.
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default userReducer;
