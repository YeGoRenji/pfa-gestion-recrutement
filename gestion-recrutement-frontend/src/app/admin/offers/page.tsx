"use client";
import TableData from "@/components/TableData";
import AccessContext from "@/context/AccessContext";
import { handleGetRequest } from "@/functions";
import { OfferRowType } from "@/types";
import { useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function Offers({}: Props) {
  const [data, setData] = useState<OfferRowType[]>([]);
  const [access, _] = useContext(AccessContext);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      if (!access) return;
      const data = await handleGetRequest(
        "/offers/all",
        null,
        (error) => {
          toast({
            title: "Server Error !",
            description: error.response?.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        access
      );
      console.log(data?.data);
      setData(data?.data);
    }
    fetchData();
  }, [access, toast]);

  return (
    <div>
      <TableData data={data} idCol="profileId" excludeCols={["createdAt", "modifiedAt", "concernId", "managerId"]} objectCol="requiredProfile" />
    </div>
  );
}
