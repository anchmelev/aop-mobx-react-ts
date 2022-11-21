import { notification } from "antd";

export const successfullyNotify =
  (message: string, description?: string) => (target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.call(this, ...args);
      notification.success({
        message,
        description,
        placement: "bottomRight",
      });
      return result;
    };
  };
