export type Product = {
  id: number;
  title: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
};

export function getProductList() {
  return fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => data.products as Product[]);
}

export function getUserList() {
  return fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => data.users as User[]);
}

export function getUsersWithError() {
  return new Promise<User[]>((_, reject) => {
    setTimeout(() => reject(new Error("User upload error")), 1500);
  });
}
