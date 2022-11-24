import { action, makeObservable, observable } from "mobx";
import { createDecorator } from "./createDecorator";

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

export const loadable = <T>(keyLoading: keyof T) =>
  createDecorator<ILoadable<T>>(async (self, method, ...args) => {
    try {
      if (self.loading[keyLoading]) return;
      self.setLoading(keyLoading, true);
      return await method.call(self, ...args);
    } finally {
      self.setLoading(keyLoading, false);
    }
  });
