import { action, makeObservable, observable } from "mobx";

type KeyBooleanValue = {
  [key: string]: boolean;
};

export interface ILoadable<T> {
  loading: T;
  setLoading(key: keyof T, value: boolean): void;
}

export abstract class Loadable<T> implements ILoadable<T> {
  @observable loading: T;

  constructor() {
    this.loading = {} as T;
    makeObservable(this);
  }

  @action
  setLoading(key: keyof T, value: boolean) {
    (this.loading as KeyBooleanValue)[key as string] = value;
  }
}

export const loadable =
  <T>(keyLoading: keyof T) =>
  (target: ILoadable<T>, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const _this = this as ILoadable<T>;
      try {
        if (_this.loading[keyLoading]) return;
        _this.setLoading(keyLoading, true);
        return await originalMethod.call(this, ...args);
      } finally {
        _this.setLoading(keyLoading, false);
      }
    };
  };
