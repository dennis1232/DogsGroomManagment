import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor
  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();

      if (session?.user?.accessToken) {
        console.log({ session });

        try {
          config.headers.Authorization = `Bearer ${session.user.accessToken}`;
        } catch (error) {
          console.error("Error fetching session:", error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
