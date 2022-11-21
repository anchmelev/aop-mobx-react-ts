import { makeObservable, observable, runInAction } from "mobx";
import { errorHandle } from "./AOP/errorHandle";
import { loadable, Loadable } from "./AOP/loadable";
import { log } from "./AOP/log";
import { successfullyNotify } from "./AOP/successfullyNotify";
import { getProductList, getUserList, getUsersWithError, Product, User } from "./Api";

const defaultLoading = {
  users: false,
  products: false,
  usersWithError: false,
  usersWithNotification: false,
  usersWithLog: false,
};

class AppStore extends Loadable<typeof defaultLoading> {
  @observable users: User[] = [];
  @observable users2: User[] = [];
  @observable users3: User[] = [];
  @observable users4: User[] = [];
  @observable products: Product[] = [];

  constructor() {
    super();
    makeObservable(this);
    this.loading = defaultLoading;
  }

  @loadable("users")
  async loadUsers() {
    const users = await getUserList();
    runInAction(() => (this.users = users));
  }

  @loadable("products")
  async loadProducts() {
    const products = await getProductList();
    runInAction(() => (this.products = products));
  }

  @loadable("usersWithError")
  @errorHandle()
  async loadUsersWithError() {
    const users = await getUsersWithError();
    runInAction(() => (this.users2 = users));
  }

  @loadable("usersWithNotification")
  @successfullyNotify("Users uploaded successfully")
  async loadUsersWithNotification() {
    const users = await getUserList();
    runInAction(() => (this.users3 = users));
  }

  @loadable("usersWithLog")
  @log()
  async loadUsersWithLog() {
    const users = await getUserList();
    runInAction(() => (this.users4 = users));
  }
}

export const appStore = new AppStore();
