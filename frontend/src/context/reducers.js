export default(state, action) =>{
    switch (action.type) {
        case "LOGIN":
          localStorage.setItem("user", JSON.stringify(action.payload));
          return {
            ...state,
            user: action.payload,
          };
        case "LOGIN_FAIL":
          return {
            ...state,
            user:null
          }
        case "REGISTER":
            return {
              ...state,
              user: null,
            };
        case "LOGOUT":
          localStorage.clear();
          return {
            ...state,
            user: null
          };
        default:
          return state;
      }
}
