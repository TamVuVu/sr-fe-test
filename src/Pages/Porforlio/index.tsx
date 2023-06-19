import { useEffect, useState } from "react";
import { DataType, StepDrawer, Table } from "../../Components";
import { MOCK_USER_INFO, PLAN_STATUS_DISPLAY } from "../../constant";
import { apiGetPlans } from "../../Api";
import { Input, Tag, Switch, Popover, List, message } from "antd";
import {
  FilterOptions,
  IResponseMoviesSuccess,
  IResponseError,
} from "../../types";
import { appendApiKey } from "../../utils";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "../../Components/Button";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import moment from "moment";
import "./index.scss";

const { Search } = Input;
const popupList = [
  "Edit Plan",
  "Send Plan",
  "Copy Plan To Live",
  "Delete Plan",
  "View Details",
];

export const Portfolio = () => {
  const [plans, setPlans] = useState<IResponseMoviesSuccess | IResponseError>(
    [] as any
  );
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    page: "1",
    limit: "10",
  });
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserDisplay = (
    isEndTarget: boolean,
    isOngoing: boolean,
    isPause: boolean
  ) => {
    if (isEndTarget) {
      return PLAN_STATUS_DISPLAY.take_profit;
    } else if (isOngoing) {
      return PLAN_STATUS_DISPLAY.active;
    } else if (isPause) {
      return PLAN_STATUS_DISPLAY.pause;
    } else return PLAN_STATUS_DISPLAY.stoploss;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Plan Name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (value, _record, index) => {
        const planStatusDisplay = getUserDisplay(
          value.is_endtarget,
          value.is_ongoing,
          value.is_pause
        );
        return (
          <Tag color={planStatusDisplay.backGroundColor}>
            <label
              style={{
                color: planStatusDisplay.textColor,
              }}
            >
              {planStatusDisplay.label}
            </label>
          </Tag>
        );
      },
    },
    {
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (value, _record, index) => (
        <div className="cell-user-info">
          <p>{MOCK_USER_INFO[index % 5].userName}</p>
          <label>
            Created: {moment(value.created_at).format("MMMM DD, YYYY")}
          </label>
        </div>
      ),
    },
    {
      title: "Invested",
      dataIndex: "budget",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.budget - b.budget,
      render: (value) => `$${value}`,
    },
    {
      title: "PnL",
      dataIndex: "profit",
      sorter: (a, b) => a.profit - b.profit,
      render: (value) => {
        let color = "#111827";
        if (Number(value) > 0) {
          color = "#0CAF60";
        } else if (Number(value) < 0) {
          color = "#FD6A6A";
        }
        return (
          <span style={{ color: color }} className="font-bold">
            {Number(value) > 0 ? "+" : ""}
            {value}$
          </span>
        );
      },
    },
    {
      title: "Today PnS",
      dataIndex: "current_profit",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.current_profit - b.current_profit,
      render: (value) => {
        let color = "#111827";
        if (Number(value) > 0) {
          color = "#0CAF60";
        } else if (Number(value) < 0) {
          color = "#FD6A6A";
        }
        return (
          <span style={{ color: color }} className="font-bold">
            {Number(value) > 0 ? "+" : ""}
            {value}$
          </span>
        );
      },
    },
    {
      title: "Actions",
      render: (value) => (
        <div className="flex justify-between items-center">
          <Switch checked={value.status === "RUNNING"} />
          <Popover
            placement="bottomRight"
            content={
              <List
                size="small"
                bordered
                dataSource={popupList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            }
            trigger="click"
          >
            <EllipsisOutlined className="border p-3 rounded-xl" />
          </Popover>
        </div>
      ),
    },
  ];

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleChangeTable = (pagination: TablePaginationConfig) => {
    setFilterOptions({
      ...filterOptions,
      page: pagination.current?.toString(),
      limit: String(pagination.pageSize),
    });
  };

  useEffect(() => {
    const getPlans = async () => {
      setIsLoading(true);
      const filterParams = new URLSearchParams(filterOptions).toString();
      const result = await apiGetPlans(
        appendApiKey("/api/v1/plan", `?${filterParams}`)
      );
      if (result?.Response === "False") {
        message.error(result?.Error);
      } else setPlans(result);
      setIsLoading(false);
    };

    getPlans();
  }, [filterOptions, filterOptions.page, filterOptions.limit]);

  return (
    <div className="portfolio">
      <h1 className="font-bold">Investment Plan</h1>
      <div className="portfolio__page">
        <div className="portfolio__page--content">
          <div className="header flex flex-wrap justify-between bg-white">
            <Search
              className="search-plan mb-3"
              placeholder="Search Plan..."
              prefix={<SearchOutlined className="prefix-search" />}
              enterButton={"Search"}
            />
            <Button
              btnType="success"
              type="primary"
              onClick={() => setIsOpenDrawer(true)}
            >
              Add Plan
            </Button>
          </div>
          <Table
            loading={isLoading}
            data={plans}
            columns={columns}
            onTableChange={handleChangeTable}
          />
        </div>
      </div>
      <StepDrawer
        isOpenDrawer={isOpenDrawer}
        onCloseDrawer={handleCloseDrawer}
      />
    </div>
  );
};
