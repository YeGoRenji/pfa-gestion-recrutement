// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import HomeLayout from "./HomeLayout";
import { usePathname, useRouter } from "next/navigation";
import AccessContext from "@/context/accessContext";
import { useEffect, useState } from "react";
import { CacheProvider } from "@chakra-ui/next-js";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [access, setAccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tok = localStorage.getItem("access_token");
    if (['/login', '/register'].includes(path))
      if (tok)
        router.push('/');
    setAccess(tok);
  }, [path, router]);

  return (
    <AccessContext.Provider value={[access, setAccess]}>
      <CacheProvider>
      <ChakraProvider>
        {['/login', '/register'].includes(path) ? children : <HomeLayout>{children}</HomeLayout>}
      </ChakraProvider>
      </CacheProvider>
    </AccessContext.Provider>
  );
}
