import React, { useEffect } from "react";
import { Col, List, Row, Spin, Typography } from "antd";
import { observer } from "mobx-react";
import { appStore } from "./AppStore";

const LoadingPage = observer(() => {
  useEffect(() => {
    appStore.loadUsersWithNotification();
  }, []);

  return (
    <Row>
      <Col span={24}>
        {appStore.loading.usersWithNotification && <Spin className="absolute-spinner" />}
        <List
          style={{ overflow: "auto", maxHeight: 400 }}
          header={<div>Users</div>}
          bordered
          dataSource={appStore.users3}
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
