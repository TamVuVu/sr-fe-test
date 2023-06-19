import { Drawer, DrawerProps, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import { Field, Formik } from "formik";
import { Button } from "../Button";
import { useState } from "react";
import { apiCreatePlan } from "../../Api";

type StepDrawerPropsType = DrawerProps & {
  className?: string;
  isOpenDrawer?: boolean;
  onCloseDrawer: () => any;
  onSubmit?: () => any;
};

export const StepDrawer = ({
  onSubmit,
  className,
  onCloseDrawer,
  isOpenDrawer,
  ...props
}: StepDrawerPropsType) => {
  // const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const handleNext = (values: any) => {
    if (current === 0) {
      if (!values.name || !values.budget || !values.take_profit_stop_loss) {
        message.error("Please validate form");
      } else setCurrent(current + 1);
    } else if (current === 1) {
      if (!values.bot_ai_id || !values.budget_id || !values.base_amount) {
        message.error("Please validate form");
      } else setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Step 1: Set up your fund",
      descript: "View and update your account, profile, and more.",
      content: (
        <div>
          Investiment Plan
          <Input placeholder="Investiment Plan" name="name" />
        </div>
      ),
    },
    {
      title: "Step 2: Set up your strategy",
      descript: "View and update your account, profile, and more.",
      content: (
        <div>
          Choose bot AI
          <Input name="account_type" placeholder="Investiment Plan" />
        </div>
      ),
    },
    {
      title: "View & confirm your plan",
      content: "Last-content",
    },
  ];

  return (
    <Formik
      initialValues={{
        name: "",
        account_type: "demo",
        status: "",
        budget: "",
        profit: "",
        take_profit_stop_loss: "",
        stop_loss: "",
        base_amount: "",
        bot_ai_id: "bot1",
        budget_id: "qlv1",
      }}
      validate={(values) => {
        const errors = {} as any;
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.budget) {
          errors.budget = "Required";
        }
        if (!values.account_type) {
          errors.account_type = "Required";
        }
        if (!values.take_profit_stop_loss) {
          errors.take_profit_stop_loss = "Required";
        } else if (/^[/][/]*$/.test(values.take_profit_stop_loss)) {
          errors.take_profit_stop_loss = "Required only one forward slash";
        }
        if (!values.base_amount) {
          errors.base_amount = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const [take_profit, stop_loss] =
          values.take_profit_stop_loss.split("/");
        const payload = {
          ...values,
          take_profit_stop_loss: undefined,
          take_profit: take_profit,
          stop_loss: stop_loss,
        };
        const res = await apiCreatePlan("/api/v1/plan", payload);
        console.log(res);
        setSubmitting(false);
        onCloseDrawer();
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
        <Drawer
          className="create-plan"
          title="Create Your Plan"
          placement="bottom"
          onClose={onCloseDrawer}
          open={isOpenDrawer}
          destroyOnClose={true}
          footer={
            <div style={{ marginTop: 24 }}>
              {current > 0 && (
                <Button
                  btnType="cancel"
                  style={{ margin: "0 8px" }}
                  onClick={() => prev()}
                >
                  {"< Back"}
                </Button>
              )}

              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  btnType="success"
                  onClick={() => handleNext(values)}
                >
                  {"Next Step >"}
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  btnType="success"
                  onClick={() => {
                    handleSubmit();
                    message.success("Processing complete!");
                  }}
                >
                  Confirm And Save
                </Button>
              )}
            </div>
          }
          footerStyle={{ textAlign: "end" }}
          {...props}
        >
          <div className="step-drawer-form">
            <h3>{steps[current].title}</h3>
            <Typography.Text mark>{steps[current].descript}</Typography.Text>
            <form onSubmit={handleSubmit}>
              {current === 0 && (
                <div className="flex flex-wrap w-full justify-between">
                  <div className="input-holder">
                    <p>
                      1. Investment Plan <span className="color-red">*</span>
                    </p>
                    <Input
                      placeholder="Investment"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="error-message">
                      {errors.name && touched.name && errors.name}
                    </p>
                  </div>
                  <div className="input-holder">
                    <p>
                      2. Account Type <span className="color-red">*</span>
                    </p>
                    <Field
                      as="select"
                      name="account_type"
                      value={values.account_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="demo">DEMO</option>
                      <option value="living">LIVING</option>
                    </Field>
                    <p className="error-message">
                      {errors.account_type &&
                        touched.account_type &&
                        errors.account_type}
                    </p>
                  </div>
                  <div className="input-holder">
                    <p>
                      3. Allocate Budget <span className="color-red">*</span>
                    </p>
                    <Input
                      placeholder="Budget (number only)"
                      name="budget"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="error-message">{errors.budget}</p>
                  </div>
                  <div className="input-holder">
                    <p>
                      4. Take Profit/Stoploss{" "}
                      <span className="color-red">*</span>
                    </p>
                    <Input
                      placeholder="Take Profit/Stoploss"
                      name={"take_profit_stop_loss"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="error-message">
                      {errors.take_profit_stop_loss &&
                        touched.take_profit_stop_loss &&
                        errors.take_profit_stop_loss}
                    </p>
                  </div>
                </div>
              )}

              {current === 1 && (
                <div>
                  <div className="input-holder">
                    <p>
                      2. Choose your bot AI <span className="color-red">*</span>
                    </p>
                    <Field
                      as="select"
                      name="bot_ai_id"
                      value={values.bot_ai_id}
                      handleChange={handleChange}
                    >
                      <option value="bot1">Superman BOT</option>
                      <option value="bot2">Megaman BOT</option>
                    </Field>
                    <p className="error-message">{errors.bot_ai_id}</p>
                  </div>
                  <div className="input-holder">
                    <p>
                      3. Choose your budget strategy{" "}
                      <span className="color-red">*</span>
                    </p>
                    <Field
                      as="select"
                      name="budget_id"
                      value={values.budget_id}
                      handleChange={handleChange}
                    >
                      <option value="qlv1">QLV1</option>
                      <option value="qlv2">QLV2</option>
                    </Field>
                    <p className="error-message">{errors.budget_id}</p>
                  </div>
                  <div className="input-holder">
                    <p>
                      4. Set base amount <span className="color-red">*</span>
                    </p>
                    <Input
                      placeholder="Set base amount (number only)"
                      prefix={"$"}
                      type="number"
                      name={"base_amount"}
                      value={values.base_amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="error-message">
                      {errors.base_amount &&
                        touched.base_amount &&
                        errors.base_amount}
                    </p>
                  </div>
                </div>
              )}
            </form>
            {current === steps.length - 1 && (
              <div className="summary">
                <div></div>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </Formik>
  );
};
