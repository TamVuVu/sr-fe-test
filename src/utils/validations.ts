import { number, object, string } from "yup";

export const loginSchema = object().shape({
  email: string().email("Invalid email format").required("Required"),
  password: string().min(6, "Minimum 6 characters").required("Required"),
});

export const createPlanSchema = object({});
export const createPlanStep1 = object().shape({
  name: string().required("Required"),
  budget: number().required("Required"),
  take_profit: string()
    .matches(/^[0-9\-/]*$/, "Must be only number")
    .required("Required"),
  stop_loss: string()
    .matches(/^[0-9]*$/, "Must be only number")
    .required("Required"),
});

export const createPlanStep2 = object().shape({
  bot_ai_id: string().required("Required"),
  budget_id: string().required("Required"),
  base_amount: string()
    .matches(/^[0-9]*$/, "Must be only number")
    .required("Required"),
});
