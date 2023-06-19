import { useEffect, useState } from "react";
import { LoginForm, MovieCard, Spinner } from "../../Components";
import { ERROR_MESSAGE, MOVIE_TYPES, NotificationType } from "../../constant";
import { notification } from "antd";
import {
  IMovie,
  FilterOptions,
  IResponseMoviesSuccess,
  IResponseError,
} from "../../types";
import { appendApiKey } from "../../utils";
import { SearchOutlined } from "@ant-design/icons";

import "./index.scss";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const [movies, setMovies] = useState<IResponseMoviesSuccess | IResponseError>(
    {} as IResponseMoviesSuccess
  );
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    s: "",
    type: "",
    page: "1",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message?: string
  ) => {
    api[type]({
      message: type,
      description: message,
    });
  };

  const userInfo = localStorage.getItem("USER_INFO");
  const isAuthenticated = userInfo && JSON.parse(userInfo).isAuthenticated;

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="login-page">
      {contextHolder}
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
