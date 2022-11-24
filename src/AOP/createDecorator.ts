export type CreateDecoratorAction<T> = (self: T, originalMethod: Function, ...args: any[]) => Promise<void> | void;

export function createDecorator<T = any>(action: CreateDecoratorAction<T>) {
  return (target: T, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value; // ссылка на оригинальный метод класса
    // переопределяем метод класса
    descriptor.value = async function (...args: any[]) {
      const _this = this as T;
      await action(_this, originalMethod, ...args);
    };
  };
}
