"use client";
import TableData from "@/components/TableData";
import AccessContext from "@/context/AccessContext";
import { getErrorString, handleGetRequest } from "@/functions";
import { AppsType, ProfileType } from "@/types";
import { useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function Profile({}: Props) {
  const [access, _] = useContext(AccessContext);
  const [data, setData] = useState<AppsType[]>([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      if (!access) return;
      const data = await handleGetRequest(
        "/candidatures/me",
        null,
        (error) => {
          toast({
            title: "Server Error !",
            description: getErrorString(error.response?.data.message),
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
  }, []);

  return (
    <div className="h-[100%] overflow-y-scroll">
      <TableData
        data={data.sort(
          (a, b) =>
            new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
        )}
        idCol="candidatureId"
        excludeCols={["candidatureId", "createdAt", "modifiedAt", "candidateId", "internC", "jobC", "offerC"]}
      />
    </div>
  );
}
