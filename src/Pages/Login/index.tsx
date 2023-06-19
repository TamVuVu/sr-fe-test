import { LoginForm } from "../../Components";
import { Navigate } from "react-router-dom";
import "./index.scss";

export const Login = () => {
  const userInfo = localStorage.getItem("USER_INFO");
  const isAuthenticated = userInfo && JSON.parse(userInfo).isAuthenticated;

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="login-page">
      <div className="form-holder w-full">
        <h1 className="my-5 text-center font-bold login-page__title">
          Login to your account
        </h1>
        <div className="flex justify-center">
          <LoginForm
            onSubmit={() => {
              console.log("submited");
            }}
          />
        </div>
      </div>
    </div>
  );
};
