"use client";
import AccessContext from "@/context/AccessContext";
import { handleGetRequest } from "@/functions";
import { ProfileType } from "@/types";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

type Props = {};

export default function Profiles({}: Props) {
  const [data, setData] = useState<ProfileType[]>([]);
  const [access, _] = useContext(AccessContext);
  const toast = useToast();

  useEffect(() => {
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
    fetchData();
  }, [access, toast]);

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {data[0] &&
                Object.keys(data[0]).filter((_, index) => ![1, 2].includes(index)).map((header, index) => (
                  <Th key={index}>{header}</Th>
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((elt) => (
                <Tr key={elt.profileId}>
                  {Object.values(elt).filter((_, index) => ![1, 2].includes(index)).map((val, index) => (
                    <Td key={index}>{val.toString()}</Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
