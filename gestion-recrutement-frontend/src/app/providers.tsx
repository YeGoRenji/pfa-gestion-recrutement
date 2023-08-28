// app/providers.tsx
"use client";

import { Center, ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import HomeLayout from "./HomeLayout";
import { usePathname, useRouter } from "next/navigation";
import AccessContext from "@/context/accessContext";
import { useEffect, useState } from "react";
import { CacheProvider } from "@chakra-ui/next-js";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [access, setAccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const tok = localStorage.getItem("access_token");
    if (["/login", "/register"].includes(path) && tok) return router.push("/");
    setLoading(false);
    setAccess(tok);
  }, [path, router]);

  return (
    <AccessContext.Provider value={[access, setAccess]}>
      <CacheProvider>
        <ChakraProvider>
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
