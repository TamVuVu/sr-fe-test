import apiService from "../App/apiService";
import { Error, IResponseError } from "../types";

export const apiGetPlans = async (
  path: string
): Promise<any | IResponseError> => {
  try {
    const plans = (await apiService.get(path))?.data;
    return plans;
  } catch (error) {
    const err = error as Error;
    return {
      Response: "False",
      Error: err.message ? err.message : "Something went wrong",
    };
  }
};

export const apiCreatePlan = async (
  path: string,
  payload: any
): Promise<any | IResponseError> => {
  try {
    const plan = (await apiService.post(path, payload))?.data;
    return plan;
  } catch (error) {
    const err = error as Error;
    return {
      Response: "False",
      Error: err.message ? err.message : "Something went wrong",
    };
  }
};
