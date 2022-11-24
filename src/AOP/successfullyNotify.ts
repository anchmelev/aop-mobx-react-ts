import { notification } from "antd";
import { createDecorator } from "./createDecorator";

export const successfullyNotify = (message: string, description?: string) =>
  createDecorator(async (self, method, ...args) => {
    const result = await method.call(self, ...args);
    notification.success({
      message,
      description,
      placement: "bottomRight",
    });
    return result;
  });
