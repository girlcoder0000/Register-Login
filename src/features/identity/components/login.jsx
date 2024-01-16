import {
  Link,
  Navigate,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import { httpservice } from "../../../core/http-service";
import { useContext } from "react";
import { AppContext } from "../../../contexts/app/app-context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { Ath, ChangeAth } = useContext(AppContext);
  const { t } = useTranslation();
  const schema = yup.object().shape({
    mobile: yup.string().required(t("login.validation.mobileRequired")),
    password: yup.string().required(t("login.validation.passwordRequred")),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitForm = useSubmit();
  const onSubmit = (data) => {
    const { mobile, password } = data;
    const username = mobile;
    const { ...userData } = { username, password };
    submitForm(userData, { method: "post" });
  };
  const isSuccesfulSubmit = useActionData();
  console.log(isSuccesfulSubmit);
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const routeErrors = useRouteError();
  return (
    <>
      <div className="text-center mt-4">
        <div style={{ height: "100px" }}>logo</div>
        <h1 className="h2">{t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          <Link to="/register" className="me-2">
            {t("login.register")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input
                  {...register("mobile")}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.mobile?.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("login.password")}</label>
                <input
                  {...register("password")}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("login.signingin") : t("login.signin")}
                </button>
              </div>
              {
                // isSuccesfulSubmit  && (
                //   <div className="alert alert-danger text-danger p-2 mt-3">
                //   {/* {t("login.validation.IncorrectUserNameOrPassword")} */}
                //   {isSuccesfulSubmit}
                //   </div>
                // )
              }
               {routeErrors && (
                <>
                  <div className="alert alert-danger text-danger p-2 mt-3">
                    {t("login.validation.IncorrectUserNameOrPassword")}
                  </div>
                </>
              )} 
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const response = await httpservice.post("/login", data);
  if (response.status === 200) {
    
    localStorage.setItem("token", response.data?.token);
    return redirect("/");
  }
}

export default Login;
