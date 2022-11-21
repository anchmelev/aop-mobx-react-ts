import React, { useEffect } from "react";
import { Col, List, Row, Spin, Typography } from "antd";
import { observer } from "mobx-react";
import { appStore } from "./AppStore";

const LoadingPage = observer(() => {
  useEffect(() => {
    appStore.loadUsers();
    appStore.loadProducts();
  }, []);

  console.log("LoadingPage", appStore.loading.users);

  return (
    <Row>
      <Col span={12}>
        {appStore.loading.users && <Spin className="absolute-spinner" />}
        <List
          style={{ marginRight: 8, overflow: "auto", maxHeight: 400 }}
          header={<div>Users</div>}
          bordered
          dataSource={appStore.users}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>
                {item.firstName} {item.lastName} {item.maidenName}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Col>
      <Col span={12}>
        {appStore.loading.products && <Spin className="absolute-spinner" />}
        <List
          style={{ marginLeft: 8, overflow: "auto", maxHeight: 400 }}
          header={<div>Product</div>}
          bordered
          dataSource={appStore.products}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.title}</Typography.Text>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
});

export default LoadingPage;
