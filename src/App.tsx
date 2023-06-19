import { createContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ConfigProvider from "./Contexts/ConfigContext";
import Layout from "antd/es/layout/layout";
import { NavBar } from "./Components";
import { Dropdown } from "antd";
export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loadingState: boolean) => {},
});

function App() {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("USER_INFO");
    navigate("/login");
  };
  const items = [
    {
      key: "0",
      label: (
        <label onClick={signOut} className="cursor-pointer">
          Sign Out
        </label>
      ),
    },
  ];
  const userInfo = localStorage.getItem("USER_INFO");
  const parsedUserInfo = userInfo && JSON.parse(userInfo);
  const isAuthenticated = parsedUserInfo?.isAuthenticated;
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <ConfigProvider>
      <div className="App h-screen">
        <Layout className="h-full">
          <NavBar />
          <div className="content w-full">
            <div className="relative">
              <div className="user absolute top-0 right-0 cursor-pointer">
                <div className="flex items-center">
                  <div className="user__avatar mr-3 text-center">R</div>
                  <Dropdown
                    menu={{ items }}
                    placement="bottom"
                    trigger={["click"]}
                  >
                    <div className="user__info flex flex-col">
                      <div className="user__info--name font-bold">
                        {parsedUserInfo.userName}
                      </div>
                      <div className="user__info--id">
                        #{parsedUserInfo.userId}
                      </div>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

export default App;
