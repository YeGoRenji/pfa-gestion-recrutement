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

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [access, setAccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async (tok: string | null) => {
      setLoading(true);
      let verified = null;
      if (tok)
      {
        const res = await handleGetRequest("/auth/verify", null, (err) => null, tok
        );
        verified = res?.data;
        verified = res;
      }
      console.log(verified);
      if (!verified && tok)
        localStorage.removeItem("access_token");
      if (["/login", "/register"].includes(path) && verified)
        return router.push("/");
      if (["/internship", "/job"].includes(path) ||  path.startsWith("/apply") && !verified)
        return router.push("/login");
      console.log("here");
      setLoading(false);
      setAccess(verified ? tok : null);
    };
    const tok = localStorage.getItem("access_token");
    verify(tok);
  }, [path, router, access]);

  return (
    <AccessContext.Provider value={[access, setAccess]}>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Spinner size="xl" />
            </div>
          ) : (
            <>
              {["/login", "/register"].includes(path) ? (
                children
              ) : (
                <HomeLayout>{children}</HomeLayout>
              )}
            </>
          )}
        </ChakraProvider>
      </CacheProvider>
    </AccessContext.Provider>
  );
}
