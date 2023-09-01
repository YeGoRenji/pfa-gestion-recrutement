"use client";

import { handleGetRequest } from "@/functions";
import {
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import OfferRow from "@/components/OfferRow";
import { OfferRowType } from "@/types";
import AccessContext from "@/context/AccessContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<OfferRowType[]>([]);
  const [access, setAccess] = useContext(AccessContext);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    async function fetchData() {
      const data = await handleGetRequest("/offers/all", null, (error) => {
        toast({
          title: "Server Error !",
          description: error.response?.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
      setData(data?.data);
    }
    fetchData();
  }, [toast]);
  return (
    <div>
      <div>
        {data && data.map((data) => (
          <OfferRow key={data.offerId} offer={data} onApply={() => {
            if (!access) {
              router.push('/login');
              return;
            }
            router.push(`/apply/${data.offerId}`);
          }}/>
        ))}
      </div>
    </div>
  );
}
