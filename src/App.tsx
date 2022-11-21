import React, { useMemo, useState } from "react";
import { BarChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import LoadingPage from "./LoadingPage";
import ErrorHandlePage from "./ErrorHandlePage";
import NotificationPage from "./NotificationPage";
import LogPage from "./LogPage";
import "./App.css";

const { Sider, Content } = Layout;

enum Page {
  loading = "1",
  errorHandle = "2",
  notification = "3",
  log = "4",
}

const App = () => {
  const [page, setPage] = useState(Page.loading);

  const pages = useMemo(
    () => ({
      [Page.loading]: <LoadingPage />,
      [Page.errorHandle]: <ErrorHandlePage />,
      [Page.notification]: <NotificationPage />,
      [Page.log]: <LogPage />,
    }),
    []
  );

  return (
    <Layout className="app">
      <Sider trigger={null}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(item) => {
            setPage(item.key as Page);
          }}
          items={[
            {
              key: Page.loading,
              icon: <BarChartOutlined />,
              label: "Loading",
            },
            {
              key: Page.errorHandle,
              icon: <BarChartOutlined />,
              label: "Error handle",
            },
            {
              key: Page.notification,
              icon: <BarChartOutlined />,
              label: "Notification",
            },
            {
              key: Page.log,
              icon: <BarChartOutlined />,
              label: "Log",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content className="site-layout-background">{pages[page]}</Content>
      </Layout>
    </Layout>
  );
};

export default App;
