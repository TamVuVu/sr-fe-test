import { useState } from "react";
import { LoginForm } from "../../Components";
import { NotificationType } from "../../constant";
import { notification } from "antd";
import {
  FilterOptions,
  IResponseMoviesSuccess,
  IResponseError,
} from "../../types";

import "./index.scss";
import { Navigate, useNavigate } from "react-router-dom";

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
