import { OfferRowType } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Spinner,
  Tag,
  Text,
} from "@chakra-ui/react";
import {FaSuitcase} from "react-icons/fa";
import React from "react";

type Props = { offer: OfferRowType; onApply: () => void; loading: boolean };

const offertypeStr = {
  "JOB_OFFER": 'Job Offer',
  "INTERNSHIP_OFFER": 'Internship',
}

export default function OfferRow({ offer, onApply, loading }: Props) {


  return (
    <Card
      className="bg-gray-700 text-white"
      variant={"elevated"}
      key={offer.offerId}
    >
      <CardHeader>
        <div className="flex justify-between">
          <Heading className="text-primary-200" size="md">
            {offer.title} ({offer.profile.requiredProfile})
          </Heading>
          <HStack color="gray.300" spacing="10">
            <Flex gap="3" align="center"><FaSuitcase/>{offertypeStr[offer.type]}</Flex>
            <Text>Contract: {offer.contract}</Text>
            <Text>Location: {offer.location}</Text>
          </HStack>
        </div>
      </CardHeader>
      <CardBody>
        <Flex justify={"space-between"}>
          <Text w="80%" overflowWrap={"anywhere"}>
            {offer.description}
          </Text>
          <Button
            onClick={onApply}
            isDisabled={loading}
            variant={"solid"}
            className="bg-primary-300 text-black hover:bg-primary-200"
          >
            {loading ? <Spinner/> : "Apply now"}
          </Button>
        </Flex>
        <HStack spacing={2}>{offer.profile.desiredSkills.map((desired, index) => (
          <Tag key={index}>{desired}</Tag>
        ))}</HStack>
      </CardBody>
    </Card>
  );
}
