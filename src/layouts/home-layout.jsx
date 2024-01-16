import { Outlet, useNavigate } from "react-router-dom";
import ChangeLanguage from "../components/change-language";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/app/app-context";
import { useTranslation } from "react-i18next";
const HomeLayout = () => {
  const[isLoggedIn,setISLoggedIn]=useState(localStorage.getItem('token')!==null?true:false)
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Logout = () => {
    setISLoggedIn(false)
    localStorage.removeItem("token");
  };
  const HandleLog = () => {
    isLoggedIn ? Logout() : navigate("/login");
  };
  return (
    <>
      <div className="main d-flex justify-content-center w-100">
        <div className="navbar shadow-sm">
          <ChangeLanguage />
          <button
            style={{
              border: "none",
              backgroundColor: "#3f80ea",
              color: "#fff",
            }}
            className="btn btn-lg btn-primary"
            onClick={()=>HandleLog()}
          >
            {isLoggedIn ? t("button.logout") : t("button.login")}
          </button>
        </div>
        <main className="content d-flex p-0">
          <div className="container d-flex flex-column">
            <div className="row h-100">
              <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div className="d-table-cell align-middle"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomeLayout;
