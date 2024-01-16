const appReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "CHANGE_LANGUAGE": {
      return {
        ...state,
        language: action.payload,
      };
    }
    case "CHANGE_AUTH": {
      return {
        ...state,
        Ath: action.payload,
      };
    }
  }
};
export default appReducer;
