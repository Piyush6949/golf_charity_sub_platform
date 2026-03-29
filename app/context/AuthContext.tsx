"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** Shape returned by GET /api/user (JSON-serialized Prisma user + relations). */
export type AuthUser = {
  name: string;
  email: string;
  isSubscribed: boolean;
  subscriptionEnd: string | Date | null;
  charityId: string | null;
  charityContribution: number;
  role: string;
  scores?: unknown;
  charity?: unknown;
  winners?: unknown;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  const loadUser = useCallback(async (showLoading: boolean) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/user", { credentials: "include" });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = (await res.json()) as AuthUser;
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => loadUser(false), [loadUser]);

  // Re-fetch when the route changes so login/register redirects pick up the new session
  // without a full reload. Only the first load shows the global loading state.
  useEffect(() => {
    const showLoading = isFirstLoad.current;
    void loadUser(showLoading).finally(() => {
      isFirstLoad.current = false;
    });
  }, [pathname, loadUser]);

  const logout = useCallback(async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, refresh, logout }),
    [user, loading, refresh, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
