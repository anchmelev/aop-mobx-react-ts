import React, { useEffect } from "react";
import { Col, List, Row, Spin, Typography } from "antd";
import { observer } from "mobx-react";
import { appStore } from "./AppStore";
import Title from "antd/es/typography/Title";

const LoadingPage = observer(() => {
  useEffect(() => {
    appStore.loadUsersWithLog();
  }, []);

  return (
    <Row>
      <Col span={24}>
        {appStore.loading.usersWithLog && <Spin className="absolute-spinner" />}
        <Title level={4}>Open the console to see the logging of the <b>loadUsersWithLog</b> method!</Title>
        <List
          style={{ overflow: "auto", maxHeight: 400 }}
          header={<div>Users</div>}
          bordered
          dataSource={appStore.users4}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>
                {item.firstName} {item.lastName} {item.maidenName}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
});

export default LoadingPage;
