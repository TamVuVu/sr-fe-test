import { Button as AntdButton, ButtonProps } from "antd";
import "./index.scss";
import { ReactNode } from "react";

type ButtonPropsType = ButtonProps & {
  btnType?: "success" | "cancel";
  children: ReactNode;
};

export const Button = (props: ButtonPropsType) => {
  const { btnType, children, className, ...inputProps } = props;
  return (
    <AntdButton
      className={`btn-${btnType} font-bold h-full ${
        className ? className : ""
      }`}
      {...inputProps}
    >
      {children}
    </AntdButton>
  );
};
