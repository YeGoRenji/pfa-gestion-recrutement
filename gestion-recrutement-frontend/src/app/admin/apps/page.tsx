"use client";
import TableData from "@/components/TableData";
import AccessContext from "@/context/AccessContext";
import { handleGetRequest } from "@/functions";
import { ProfileType } from "@/types";
import { useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function Apps({}: Props) {
  const [data, setData] = useState<ProfileType[]>([]);
  const [access, _] = useContext(AccessContext);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      if (!access) return;
      const data = await handleGetRequest(
        "/candidatures/all",
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
      setData(data?.data);
    }
    fetchData();
  }, [access, toast]);

  return (
    <div>
      <TableData data={data} idCol="profileId" excludeCols={["createdAt", "modifiedAt", "candidateId", "jobC", "offerC", "internC"]} />
    </div>
  );
}

