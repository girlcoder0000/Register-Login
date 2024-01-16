import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./app-reducer";
import { changeLanguage } from "i18next";
import i18n from "../../core/i18n";

export const AppContext = createContext();
const initialState = {
  language: localStorage.getItem("language") || "fa",
  Ath: localStorage.getItem("token") === null ? true : false,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const ChangeLanguage = (language) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: language });
  };
  const ChangeAuth = (Ath) => {
    dispatch({ type: "CHANGE_AUTH", payload: Ath });
  };
  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
  }, [state.language]);

  return (
    <AppContext.Provider value={{ ...state, ChangeLanguage, ChangeAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
