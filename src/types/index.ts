export interface IUser {
  email: string;
  password: string;
}
export interface ICreatePlan {
  name: string;
  account_type: "demo" | "living";
  budget: string | number;
  profit: string | number;
  take_profit: string | number;
  stop_loss: string | number;
  base_amount: string | number;
  bot_ai_id: string;
  budget_id: string;
  take_profit_stop_loss?: string;
}

export interface IPlan extends ICreatePlan {
  id: string;
  status: string;
  current_profit: number;
  is_endtarget: boolean;
  is_ongoing: boolean;
  is_pause: boolean;
  created_at?: string;
}

export interface IConfigReducer {
  isLoading: boolean;
  errorMessage: string;
}

export interface Error {
  message?: string;
}
export type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[];
};

export type FilterOptions = {
  page?: string;
  limit?: string;
};

export interface IResponse {
  Response: "True" | "False";
}

export interface IResponseSuccess extends IResponse {
  Response: "True";
}

export interface IResponsePlansSuccess extends IResponseSuccess {
  plans: IPlan[];
}

export interface IResponseError extends IResponse {
  Response: "False";
  Error: string;
}
