import React, { useEffect } from "react";
import { Col, List, Row, Spin, Typography } from "antd";
import { observer } from "mobx-react";
import { appStore } from "./AppStore";

const ErrorHandlePage = observer(() => {
  useEffect(() => {
    appStore.loadUsersWithError();
  }, []);

  const usersWithError = appStore.loading.usersWithError;
  return (
    <Row>
      <Col span={24}>
        {usersWithError && <Spin className="absolute-spinner" />}
        <List
          style={{ overflow: "auto", maxHeight: 400 }}
          header={<div>Users</div>}
          bordered
          dataSource={appStore.users2}
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

export default ErrorHandlePage;
