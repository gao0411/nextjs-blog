// hooks/use-auth.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // 检查登录状态
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAuthState({
          user: data.user || null,
          isAuthenticated: data.isAuthenticated || false,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("检查认证状态失败:", error);
      setAuthState({
        user: null,
        isAuthenticated: false,
      });
    }
  };

  // 登录
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // 重新检查认证状态
        await checkAuth();
        return data;
      } else {
        if (response.status === 401) {
          return { ...data, status: response.status };
        }
        return {
          ...data,
          status: response.status,
        };
      }
    } catch (error) {
      console.error("登录请求失败:", error);
      return {
        success: false,
        error: "网络错误，请稍后重试",
      };
    }
  };

  // 登出
  const logout = useCallback(async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "DELETE",
      });

      if (response.ok) {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });
        router.push("/login");
        return { success: true };
      } else {
        return {
          success: false,
          error: "登出失败",
        };
      }
    } catch (error) {
      console.error("登出请求失败:", error);
      return {
        success: false,
        error: "网络错误，请稍后重试",
      };
    }
  }, [router]);

  // 初始化时检查登录状态
  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuth,
  };
}
