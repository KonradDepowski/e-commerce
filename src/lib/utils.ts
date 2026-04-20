import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export function isValidObjectId(id: string) {
  return OBJECT_ID_REGEX.test(id);
}
