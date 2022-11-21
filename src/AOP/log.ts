export type LogPoint = "before" | "after" | "error" | "success";

let defaultLogPoint: LogPoint[] = ["before", "after", "error", "success"];

export function setDefaultLogPoint(logPoints: LogPoint[]) {
  defaultLogPoint = logPoints;
}

export const log =
  (points = defaultLogPoint) =>
  (target: unknown, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        if (points.includes("before")) {
          console.log(`Before calling the method ${originalMethod.name} with args: `, args);
        }

        const result = await originalMethod.call(this, ...args);

        if (points.includes("success")) {
          console.log(`The method ${originalMethod.name} worked successfully. Return value: ${result}`);
        }

        return result;
      } catch (error) {
        if (points.includes("error")) {
          console.log(
            `An exception occurred in the method ${originalMethod.name}. Exception message: `,
            (error as Error).message
          );
        }
        throw error;
      } finally {
        if (points.includes("after")) {
          console.log(`The method ${originalMethod.name} completed`);
        }
      }
    };
  };
