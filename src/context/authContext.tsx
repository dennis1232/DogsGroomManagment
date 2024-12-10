"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession,
} from "next-auth/react";
import axiosInstance from "@/lib/axiosInstance";
import useToast from "@/hooks/useToast";
import { APIEndpoints, ToastMessages } from "@/lib/constants";
import { User } from "@/models/User";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSuccess, showError } = useToast();
  const { data: session, status } = useSession();

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get<User>(APIEndpoints.userDetails);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const result = await nextAuthSignIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      await fetchCurrentUser();
      showSuccess(ToastMessages.loginSuccess);
    } catch (error) {
      showError(ToastMessages.loginFailure);
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await nextAuthSignOut({ redirect: false });
      setUser(null);
      showSuccess(ToastMessages.logoutSuccess);
    } catch (error) {
      console.error("Logout failed:", error);
      showError(ToastMessages.actionFailed);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.accessToken && !user) {
      fetchCurrentUser();
    }
  }, [session, user, fetchCurrentUser, status]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
