import { Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { USER_INFO, VALID_USER } from "../../constant";

import "./index.scss";
import { Formik } from "formik";
import { Button } from "../Button";
import { loginSchema } from "../../utils/validations";

type FormPropsType = {
  className?: string;
  onSubmit: () => any;
};

export const LoginForm = ({ onSubmit, className }: FormPropsType) => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {} as any;
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length <= 5) {
          errors.password = "Password must be at least 6 characters";
        }
        return errors;
      }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (
          values.email === VALID_USER.email &&
          values.password === VALID_USER.password
        )
          setTimeout(() => {
            message.success("Login Successfully");
            setSubmitting(false);
            localStorage.setItem(
              USER_INFO,
              JSON.stringify({
                isAuthenticated: true,
                userId: "123456",
                userName: "Robert Chen",
              })
            );
            navigate("/");
          }, 400);
        else {
          message.error("Wrong email or password");
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="formilk">
          <div className="input-holder">
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <p className="error-message">
              {errors.email && touched.email && errors.email}
            </p>
          </div>
          <div className="input-holder">
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <p className="error-message">
              {errors.password && touched.password && errors.password}
            </p>
          </div>
          <div>
            <Button
              type="primary"
              btnType="success"
              htmlType="submit"
              disabled={isSubmitting}
              className="submit-btn w-full h-full mt-1"
            >
              Log in with email
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
