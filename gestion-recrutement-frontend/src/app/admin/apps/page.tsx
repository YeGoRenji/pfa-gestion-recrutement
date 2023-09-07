"use client";
import TableData from "@/components/TableData";
import AccessContext from "@/context/AccessContext";
import {
  getErrorString,
  handleGetRequest,
  handlePostRequest,
} from "@/functions";
import { AppsType } from "@/types";
import { Switch, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function Apps({}: Props) {
  const [data, setData] = useState<AppsType[]>([]);
  const [access, _] = useContext(AccessContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function fetchData() {
    if (!access) return;
    const data = await handleGetRequest(
      "/candidatures/all",
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
  useEffect(() => {
    fetchData();
  }, []);

  async function onChangeSwitch(id: number, status: boolean) {
    if (!access) return;
    setLoading(true);
    const res = await handlePostRequest(
      `/candidatures/approve/${id}`,
      { status },
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
    setLoading(false);
    if (res) fetchData();
  }

  return (
    <div>
      <TableData
        data={data.sort(
          (a, b) =>
            new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
        )}
        idCol="candidatureId"
        excludeCols={[
          "createdAt",
          "candidateId",
          "jobC",
          "offerC",
          "internC",
        ]}
        actions={[
          (id, obj) => (
            <Switch
              key={id}
              isChecked={obj.status}
              isDisabled={loading}
              onChange={(event) => onChangeSwitch(id, event.target.checked)}
            />
          ),
        ]}
      />
    </div>
  );
}
