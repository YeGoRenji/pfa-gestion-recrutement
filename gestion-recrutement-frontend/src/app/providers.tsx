// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import HomeLayout from "./HomeLayout";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <ChakraProvider>
      {['/login', '/register'].includes(path) ? children : <HomeLayout>{children}</HomeLayout>}
    </ChakraProvider>
  );
}
