"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user/user";

const AuthContext = createContext<null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");

    if (!token || !stored) {
      router.replace("/login");
      return;
    }

    if (!user) {
      setUser(JSON.parse(stored), token);
    }

    setChecking(false);
  }, []);

  if (checking) return null;

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
