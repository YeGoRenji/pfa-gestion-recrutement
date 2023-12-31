// app/providers.tsx
"use client";

import { Center, ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import HomeLayout from "./HomeLayout";
import { usePathname, useRouter } from "next/navigation";
import AccessContext from "@/context/AccessContext";
import { useEffect, useState } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { handleGetRequest } from "@/functions";
import theme from "./theme";
import { UserType } from "@/types";
import UserContext from "@/context/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [access, setAccess] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async (tok: string | null) => {
      setLoading(true);
      let verified = null;
      if (tok) {
        const res = await handleGetRequest(
          "/auth/verify",
          null,
          (err) => null,
          tok
        );
        verified = res?.data;
      }
      if (!verified && tok) localStorage.removeItem("access_token");
      if (["/login", "/register"].includes(path) && verified)
        return router.push("/");
      if (
        (["/internship", "/job"].includes(path) || path.startsWith("/apply")) &&
        !verified
      )
        return router.push("/login");
      if (path.startsWith("/admin/") && (!verified || !verified.isAdmin))
        return router.push("/admin");
      console.log(verified);
      setLoading(false);
      setAccess(verified ? tok : null);
      setUser(verified);
    };
    const tok = localStorage.getItem("access_token");
    verify(tok);
  }, [path, router, access]);

  return (
    <AccessContext.Provider value={[access, setAccess]}>
      <UserContext.Provider value={[user, setUser]}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <Spinner size="xl" />
              </div>
            ) : (
              <>
                {["/login", "/register"].includes(path) ||
                path.startsWith("/admin") ? (
                  children
                ) : (
                  <HomeLayout>{children}</HomeLayout>
                )}
              </>
            )}
          </ChakraProvider>
        </CacheProvider>
      </UserContext.Provider>
    </AccessContext.Provider>
  );
}
