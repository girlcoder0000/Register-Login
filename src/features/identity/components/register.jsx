import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { httpservice } from "../../../core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    mobile: yup
      .string()
      .matches(
        /^(?=.*[0-9])(?=.{11,11})/,
        t("register.validation.mobileLength")
      )
      .required(t("register.validation.mobileRequired")),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,12})/,
        t("register.validation.passwordError")
      )
      .required(t('register.validation.passwordRequred')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("register.validation.notMathching"))
      .required(t("register.validation.repeatPasswordRequired")),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = useSubmit();
  const onSubmit = (data) => {
    const { confirmPassword, mobile, password } = data;
    const username = mobile;
    const { ...userData } = { username, password };
    submitForm(userData, { method: "post" });
  };
  const isSuccesfulSubmit = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state !== "idle";
  const routeErrors = useRouteError();
  useEffect(() => {
    if (isSuccesfulSubmit) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccesfulSubmit]);

  return (
    <>
      <div className="text-center mt-4">
        <div style={{ height: "100px" }}>logo</div>
        {/* <img src={logo} style={{ height: "100px" }} /> */}
        <h1 className="h2">{t("register.title")}</h1>
        <p className="lead">{t("register.introMessage")}</p>
        <p className="lead">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="me-2">
            {t("register.signin")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
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
                <label className="form-label">{t("register.password")}</label>
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
              <div className="mb-3">
                <label className="form-label">
                  {t("register.RepeatPassword")}
                </label>
                <input
                  {...register("confirmPassword")}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("register.saving") : t("register.register")}
                </button>
              </div>
              {isSuccesfulSubmit === 200 && (
                <div className="alert alert-success text-success p-2 mt-3">
                  {t("register.successOperation")}
                </div>
              )}
              {isSuccesfulSubmit === 401 && (
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {t("register.validation.DuplicateUserName")}
                </div>
              )}
              {/* { 
                routeErrors &&(
                  <>
                 {console.log(routeErrors.message)}
                  <div className="alert alert-danger text-danger p-2 mt-3"> 
                    
                  {
                    routeErrors.message
                  
                  }
                  </div>
                  </>
                )
              } */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpservice.post("/register", data);
  return response.status;
}
