import { notification } from "antd";
import { createDecorator } from "./createDecorator";

export const errorHandle = (title?: string, desc?: string) =>
  createDecorator(async (self, method, ...args) => {
    try {
      return await method.call(self, ...args);
    } catch (error) {
      notification.error({
        message: title || "Error",
        description: desc || (error as Error).message,
        placement: "bottomRight",
      });
    }
  });
