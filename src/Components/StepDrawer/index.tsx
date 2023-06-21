import { useState } from "react";
import { Divider, Drawer, DrawerProps, Input, Typography, message } from "antd";
import { Field, Formik } from "formik";
import { apiCreatePlan } from "../../Api";
import { ICreatePlan } from "../../types";
import {
  createPlanStep1,
  createPlanStep2,
  formatTakeProfitStoploss,
  validateTakeProfitStoploss,
} from "../../utils";
import { ACCOUNT_TYPE_LIST, BOT_LIST, BUDGET_LIST } from "../../constant";
import { Button } from "../Button";
import "./index.scss";

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
  const initialValues: ICreatePlan & {
    take_profit_stop_loss: string;
  } = {
    name: "",
    account_type: "demo",
    budget: "",
    profit: "",
    take_profit_stop_loss: "",
    take_profit: "",
    stop_loss: "",
    base_amount: "",
    bot_ai_id: "bot1",
    budget_id: "qlv1",
  };
  const [current, setCurrent] = useState(0);
  const handleNext = (
    values: ICreatePlan & {
      take_profit_stop_loss: string;
    }
  ) => {
    const [take_profit, stop_loss] = values.take_profit_stop_loss.split("/");
    if (current === 0) {
      const step1 = {
        name: values.name,
        budget: values.budget,
        take_profit: take_profit,
        stop_loss: stop_loss,
      };
      if (!createPlanStep1.isValidSync(step1)) {
        message.error("Please fill form");
      } else setCurrent(current + 1);
    } else if (current === 1) {
      const step2 = {
        bot_ai_id: values.bot_ai_id,
        budget_id: values.budget_id,
        base_amount: values.base_amount,
      };
      if (!createPlanStep2.isValidSync(step2)) {
        message.error("Please fill form");
      } else setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Step 1: Set up your fund",
    },
    {
      title: "Step 2: Set up your strategy",
    },
    {
      title: "Step 3: View & confirm your plan",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
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
        if (
          !values.take_profit_stop_loss ||
          !validateTakeProfitStoploss(values.take_profit_stop_loss)
        ) {
          errors.take_profit_stop_loss =
            "Required, input number splited by forward slash (eg: 100/100)";
        }
        if (!values.base_amount) {
          errors.base_amount = "Required";
        }
        return errors;
      }}
      // validationSchema={}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const [take_profit, stop_loss] =
          values.take_profit_stop_loss.split("/");
        const payload = {
          ...values,
          take_profit_stop_loss: undefined,
          take_profit: take_profit,
          stop_loss: stop_loss,
        };
        const plan = await apiCreatePlan("/api/v1/plan", payload);
        if ("Response" in plan) {
          message.error(plan.Error);
        } else {
          resetForm();
          setCurrent(0);
          message.success("Created Plan Successfully");
        }
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
          maskClosable={false}
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
                  }}
                >
                  {"Confirm And Save >"}
                </Button>
              )}
            </div>
          }
          footerStyle={{ textAlign: "end" }}
          {...props}
        >
          <div className="step-drawer-form">
            <div className="mb-5">
              <h3>{steps[current].title}</h3>
              <Typography.Text mark>
                View and update your account, profile, and more.
              </Typography.Text>
            </div>
            <form onSubmit={handleSubmit}>
              {current === 0 && (
                <div className="flex flex-wrap w-full justify-between">
                  <div className="input-holder">
                    <p className="mb-3">
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
                    <p className="mb-3">
                      2. Account Type <span className="color-red">*</span>
                    </p>
                    <Field
                      as="select"
                      name="account_type"
                      value={values.account_type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {Object.keys(ACCOUNT_TYPE_LIST).map((accountTypeKey) => (
                        <option
                          key={accountTypeKey}
                          value={
                            ACCOUNT_TYPE_LIST[
                              accountTypeKey as keyof typeof ACCOUNT_TYPE_LIST
                            ]["value"]
                          }
                        >
                          {
                            ACCOUNT_TYPE_LIST[
                              accountTypeKey as keyof typeof ACCOUNT_TYPE_LIST
                            ]["label"]
                          }
                        </option>
                      ))}
                    </Field>
                    <p className="error-message">
                      {errors.account_type &&
                        touched.account_type &&
                        errors.account_type}
                    </p>
                  </div>
                  <div className="input-holder">
                    <p className="mb-3">
                      3. Allocate Budget <span className="color-red">*</span>
                    </p>
                    <Input
                      placeholder="Budget (number only)"
                      prefix={"$"}
                      name="budget"
                      type="number"
                      value={values.budget}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p className="error-message">
                      {errors.budget && touched.budget && errors.budget}
                    </p>
                  </div>
                  <div className="input-holder">
                    <p className="mb-3">
                      4. Take Profit/Stoploss{" "}
                      <span className="color-red">*</span>
                    </p>
                    <Input
                      placeholder="Take Profit/Stoploss"
                      value={values.take_profit_stop_loss}
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
                  <div className="input-holder max-w-full">
                    <p className="mb-3">
                      2. Choose your bot AI <span className="color-red">*</span>
                    </p>
                    <Field
                      as="select"
                      name="bot_ai_id"
                      value={values.bot_ai_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {Object.keys(BOT_LIST).map((botKey) => (
                        <option
                          key={botKey}
                          value={
                            BOT_LIST[botKey as keyof typeof BOT_LIST]["value"]
                          }
                        >
                          {BOT_LIST[botKey as keyof typeof BOT_LIST]["label"]}
                        </option>
                      ))}
                    </Field>
                    <p className="error-message">{errors.bot_ai_id}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="input-holder">
                      <p className="mb-3">
                        3. Choose your budget strategy{" "}
                        <span className="color-red">*</span>
                      </p>
                      <Field
                        as="select"
                        name="budget_id"
                        value={values.budget_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        {Object.keys(BUDGET_LIST).map((budgetKey) => (
                          <option
                            key={budgetKey}
                            value={
                              BUDGET_LIST[
                                budgetKey as keyof typeof BUDGET_LIST
                              ]["value"]
                            }
                          >
                            {
                              BUDGET_LIST[
                                budgetKey as keyof typeof BUDGET_LIST
                              ]["label"]
                            }
                          </option>
                        ))}
                      </Field>
                      <p className="error-message">{errors.budget_id}</p>
                    </div>
                    <div className="input-holder">
                      <p className="mb-3">
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
                </div>
              )}
            </form>
            {current === steps.length - 1 && (
              <div className="summary mx-auto">
                <div className="summary__banner">
                  <div className="summary__banner--title">
                    <h4>{values.name}</h4>
                  </div>
                  <div className="text-center">
                    <p className="plan-name text-white">${values.budget}</p>
                    <p>Allocated Budget</p>
                  </div>
                </div>
                <div className="summary__content">
                  <div className="flex justify-between">
                    <p className="plan-details-label font-bold">Account Type</p>
                    <p className="plan-details-value font-bold">
                      {ACCOUNT_TYPE_LIST[values.account_type]["label"]}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="plan-details-label font-bold">
                      Take Profit/Stoploss
                    </p>
                    <p className="plan-details-value font-bold">
                      {formatTakeProfitStoploss(values.take_profit_stop_loss)}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className="flex justify-between">
                    <p className="plan-details-label font-bold">
                      Budget Strategy
                    </p>
                    <p className="plan-details-value font-bold">
                      {
                        BUDGET_LIST[
                          values.budget_id as keyof typeof BUDGET_LIST
                        ]["label"]
                      }
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="plan-details-label font-bold">Bot name</p>
                    <p className="plan-details-value font-bold">
                      {
                        BOT_LIST[values.bot_ai_id as keyof typeof BOT_LIST][
                          "label"
                        ]
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </Formik>
  );
};
