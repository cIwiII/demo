export default function reducer(
  state = { users: [], user: { id: 1, name: "xiaowang" }, roles: [] },
  action
) {
  switch (action.type) {
    case "GETUSERLIST":
      state.users = action.payload;
      return { ...state };
    case "GETROLE":
      const roles = action.payload;
      return {
        ...state,
        roles
      };
    default:
      return state;
  }
}
