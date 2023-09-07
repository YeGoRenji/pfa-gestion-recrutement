"use client";

import { getErrorString, handleGetRequest } from "@/functions";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import OfferRow from "@/components/OfferRow";
import { OfferRowType } from "@/types";
import AccessContext from "@/context/AccessContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<OfferRowType[] | null>(null);
  const [access, _] = useContext(AccessContext);
  const [offerType, setOfferType] = useState("NONE");
  const [location, setLocation] = useState("NONE");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  useEffect(() => {
    async function fetchData() {
      const data = await handleGetRequest("/offers/all", null, (error) => {
        toast({
          title: "Server Error !",
          description: getErrorString(error.response?.data.message),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
      setData(data?.data);
    }
    fetchData();
  }, [toast]);

  function filterValue(offer: OfferRowType): boolean {
    if (offer.isArchived) return false;
    const isType = offerType === "NONE" || offer.type === offerType;
    const isLocation = location === "NONE" || offer.location === location;
    return isType && isLocation;
  }

  return (
    <div className="grid grid-cols-[25%_auto] gap-5 h-[100%]">
      <div>
        <div className="border-2 border-gray-700 p-5 rounded-md">
          <Text fontSize="lg">Filter By OfferType :</Text>
          <RadioGroup
            value={offerType}
            onChange={setOfferType}
            defaultValue="NONE"
            className="mt-2"
          >
            <VStack align="normal">
              <Radio value="NONE">None</Radio>
              <Radio value="JOB_OFFER">Job Offer</Radio>
              <Radio value="INTERNSHIP_OFFER">Internship Offer</Radio>
            </VStack>
          </RadioGroup>
        </div>
        <div className="mt-3 border-2 border-gray-700 p-5 rounded-md">
          <Text fontSize="lg">Filter By Location :</Text>
          <RadioGroup
            value={location}
            onChange={setLocation}
            defaultValue="NONE"
            className="mt-2"
          >
            <VStack align="normal">
              <Radio value="NONE">None</Radio>
              <Radio value="OFFICE">Office</Radio>
              <Radio value="REMOTE">Remote</Radio>
              <Radio value="HYBRID">Hybrid</Radio>
            </VStack>
          </RadioGroup>
        </div>
      </div>
      <div className="h-[100%] overflow-y-scroll">
        <Flex className="pr-2" direction="column" gap={3}>
          {!data ? (
            <>
              <Skeleton className="border rounded-md" height="168px"/>
              <Skeleton className="border rounded-md" height="168px"/>
            </>
          ) : (
            data
              .filter((value) => filterValue(value))
              .map((data) => (
                <OfferRow
                  key={data.offerId}
                  offer={data}
                  loading={loading}
                  onApply={() => {
                    setLoading(true);
                    if (!access) {
                      router.push("/login");
                      return;
                    }
                    router.push(`/apply/${data.offerId}`);
                    setLoading(false);
                  }}
                />
              ))
          )}
        </Flex>
      </div>
    </div>
  );
}
