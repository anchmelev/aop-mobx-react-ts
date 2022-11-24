import { createDecorator } from "./createDecorator";

export type LogPoint = "before" | "after" | "error" | "success";

let defaultLogPoint: LogPoint[] = ["before", "after", "error", "success"];

export function setDefaultLogPoint(logPoints: LogPoint[]) {
  defaultLogPoint = logPoints;
}

export const log = (points = defaultLogPoint) =>
  createDecorator(async (self, method, ...args) => {
    try {
      if (points.includes("before")) {
        console.log(`Before calling the method ${method.name} with args: `, args);
      }

      const result = await method.call(self, ...args);

      if (points.includes("success")) {
        console.log(`The method ${method.name} worked successfully. Return value: ${result}`);
      }

      return result;
    } catch (error) {
      if (points.includes("error")) {
        console.log(
          `An exception occurred in the method ${method.name}. Exception message: `,
          (error as Error).message
        );
      }
      throw error;
    } finally {
      if (points.includes("after")) {
        console.log(`The method ${method.name} completed`);
      }
    }
  });
