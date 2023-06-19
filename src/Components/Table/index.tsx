import {
  Card,
  Image,
  Menu,
  TableProps,
  Table as AntdTable,
  TablePaginationConfig,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IMovie } from "../../types";
import { fallbackImage } from "../../constant";

import "./index.scss";
import Sider from "antd/es/layout/Sider";
import React, { ReactNode } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

export interface DataType {
  key: React.Key;
  name: string;
  account_type: string;
  status: string;
  budget: number;
  current_profit: number;
  profit: number;
  take_profit: number;
  stop_loss: number;
  is_endtarget: boolean;
  is_ongoing: boolean;
  is_pause: boolean;
  base_amount: number;
}

export type TablePropsType = TableProps<DataType> & {
  data: any;
  onTableChange: (pagination: any) => any;
};
export const Table = ({
  columns,
  data,
  onTableChange,
  ...props
}: TablePropsType) => {
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    onTableChange(pagination);
  };

  return (
    <AntdTable
      {...props}
      columns={columns}
      dataSource={data && data}
      onChange={onChange}
      pagination={{ total: 100 }}
    />
  );
};
