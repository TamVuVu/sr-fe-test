import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { HomeOutlined, LineChartOutlined } from "@ant-design/icons";
import "./index.scss";

export const NavBar = () => {
  const location = useLocation();
  console.log(location);

  const menuItems = [
    {
      icon: HomeOutlined,
      label: <Link to={"/"}>Dashboard</Link>,
      name: "/",
    },
    {
      icon: LineChartOutlined,
      label: <Link to={"/portfolio"}>Portfolio</Link>,
      name: "/portfolio",
    },
  ];
  return (
    <Sider
      className="nav-bar-vertical"
      collapsible
      width="256"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      theme="light"
    >
      <div className="nav-bar-vertical" />
      <p className="pl-3">Menu</p>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[
          (
            menuItems.findIndex((item) => item.name === location.pathname) + 1
          ).toString(),
        ]}
        items={menuItems.map((item, index) => ({
          key: String(index + 1),
          icon: React.createElement(item.icon),
          label: item.label,
        }))}
      />
    </Sider>
  );
};
