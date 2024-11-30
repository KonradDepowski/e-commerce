import { StringValidation } from "zod";

//ORDER TYPES
export type productsIdsType = {
  id: string;
  size: string;
  quantity: number;
};

export type orderSchemaType = {
  _id?: string;
  id?: string;
  productsIds: Array<productsIdsType>;
  buyerId: string;
  buyerAvatar: string;
  createdAt?: Date;
  totalAmount: number;
  discount: string;
  deliveryData: DeliveryDataType;
  status?: string;
};

export type DeliveryDataType = {
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  town: string;
  phone: number;
};

export type productsType = {
  _id?: string | undefined;
  name: string;
  category: "lifestyle" | "sneakers" | "football" | "running";
  sex: "unisex" | "men" | "women";
  price: number;
  offer?: boolean | undefined;
  images?: string[];
  size: string;
  quantity: number;
};

export type productDataType = {
  products: productsType[];
  deliveryData: DeliveryDataType;
  totalAmount: number;
  date: Date;
  discount: string;
};

export type OrderItemDetailsProps = {
  id: string;
  image: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

//CART

export type CartItemProps = {
  id: string;
  title: string;
  price: number;
  size: string;
  category: string;
  quantity?: number;
  image: string;
};

export type CartItemsIds = {
  id: string;
  quantity: number;
  price: number;
  size: string;
};

//PRODUCT

export type productSchemaType = {
  _id?: string;
  id?: string;
  name: string;
  category: "lifestyle" | "football" | "running" | "sneakers";
  sex: "men" | "women" | "unisex";
  price: number;
  images: Array<string>;
  offer: boolean;
};

export type FilterProps = {
  category?: string | string[];
  sex?: string | string[];
  price?: string;
};

export type discountSchemaType = {
  code: string;
  amount: string;
};

//USER

export type userSchemaType = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  userCart?: Object;
};

// EXPIERS DATE

export type ExpiredDateType = {
  _id: string;
  date: Date;
};
