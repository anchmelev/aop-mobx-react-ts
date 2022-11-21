import { notification } from "antd";

export const errorHandle =
  (title?: string, desc?: string) => (target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.call(this, ...args);
      } catch (error) {
        notification.error({
          message: title || "Error",
          description: desc || (error as Error).message,
          placement: "bottomRight",
        });
      }
    };
  };
