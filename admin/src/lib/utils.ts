import { toast } from "@/hooks/use-toast";
import { EntityError } from "@/utils/api";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error?.payload?.message ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

type PayloadJWT = {
  uid: string;
  sub: string;
  scope: string;
  name: string;
  no_password: boolean;
  image: string;
  iss: string;
  exp: number;
  iat: number;
  jti: string;
};

export const convertToDate = (time: string) => {
  const formattedInput = time.slice(0, 23);
  const date = new Date(formattedInput);

  return date;
};

const isClient = typeof window !== "undefined";

export const getAccessTokenFormLocalStorage = () => {
  return isClient ? localStorage.getItem("accessToken") : "";
};

export const getRefreshTokenFormLocalStorage = () => {
  return isClient ? localStorage.getItem("refreshToken") : "";
};

export const setAccessTokenFormLocalStorage = (accessToken: string) => {
  isClient && localStorage.setItem("accessToken", accessToken);
};

export const setRefreshTokenFormLocalStorage = (refreshToken: string) => {
  isClient && localStorage.setItem("refreshToken", refreshToken);
};

export const removeTokenFormLocalStorage = () => {
  if (isClient) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  }
};