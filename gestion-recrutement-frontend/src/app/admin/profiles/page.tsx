"use client";
import TableData from "@/components/TableData";
import AccessContext from "@/context/AccessContext";
import { handleDeleteRequest, handleGetRequest } from "@/functions";
import { ProfileType } from "@/types";
import { Button, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { FaTrash } from "react-icons/fa";

type Props = {};

export default function Profiles({}: Props) {
  const [data, setData] = useState<ProfileType[]>([]);
  const [access, _] = useContext(AccessContext);
  const toast = useToast();

  async function fetchData() {
    if (!access) return;
    const data = await handleGetRequest(
      "/profiles/all",
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row-reverse mb-2">
        <Button
          onClick={() => alert("TODO")}
          size={"sm"}
          className="bg-primary-300 text-black hover:bg-primary-200"
        >
          Add Profile
        </Button>
      </div>
      <TableData
        data={data}
        idCol="profileId"
        excludeCols={["createdAt", "modifiedAt"]}
        actions={[
          (id) => (
            <FaTrash
              cursor="pointer"
              color="#F04040"
              onClick={async () => {
                await handleDeleteRequest(
                  `/profiles/remove/${id}`,
                  null,
                  (error) =>
                    toast({
                      title: "Server Error !",
                      description: error.response?.data.message,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    }),
                  access || undefined
                );
                fetchData();
              }}
            />
          ),
        ]}
      />
    </div>
  );
}
