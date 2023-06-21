import React from "react";
import { TableProps, Table as AntdTable } from "antd";
import { IPlan } from "../../types";
import "./index.scss";

export type TablePropsType = TableProps<IPlan> & {
  data: any;
  onTableChange: (pagination: any) => any;
};
export const Table = ({
  columns,
  data,
  onTableChange,
  ...props
}: TablePropsType) => {
  const onChange: TableProps<IPlan>["onChange"] = (
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
      dataSource={data.map((item: any) => ({ ...item, key: item.id }))}
      onChange={onChange}
      pagination={{ total: 100 }}
    />
  );
};
