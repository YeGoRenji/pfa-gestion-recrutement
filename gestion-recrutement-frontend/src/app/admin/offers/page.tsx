"use client";
import TableData from "@/components/TableData";
import AccessContext from "@/context/AccessContext";
import {
  getErrorString,
  handleDeleteRequest,
  handleGetRequest,
  handlePostRequest,
} from "@/functions";
import { OfferInputType, OfferRowType, ProfileType } from "@/types";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaArchive, FaTrash } from "react-icons/fa";

type Props = {};

export default function Offers({}: Props) {
  const [data, setData] = useState<OfferRowType[]>([]);
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [loading, setLoading] = useState(false);
  const [access, _] = useContext(AccessContext);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const { register, handleSubmit, reset, control } = useForm<OfferInputType>({
    defaultValues: {
      nbOfPositions: 1,
    },
  });

  const onSubmit: SubmitHandler<OfferInputType> = async (data) => {
    if (!access) return;
    if (data.concernId < 0) {
      toast({
        title: "Error !",
        description: "You should pick a profile !",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    data.nbOfPositions = parseInt(data.nbOfPositions);
    data.concernId = parseInt(data.concernId);
    setLoading(true);
    const res = await handlePostRequest(
      "/offers/create",
      data,
      (error) => {
        toast({
          title: "Add Offer Failed !",
          description: getErrorString(error.response?.data.message),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
      access
    );
    setLoading(false);
    if (res) {
      reset();
      onClose();
      fetchData();
    }
  };

  async function fetchData() {
    if (!access) return;
    const data = await handleGetRequest(
      "/offers/all",
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

  async function fetchProfiles() {
    if (!access) return;
    const data = await handleGetRequest(
      "/profiles/all",
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
    setProfiles(data?.data);
  }

  useEffect(() => {
    fetchProfiles();
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row-reverse mb-2">
        <Button
          onClick={() => onOpen()}
          size={"sm"}
          className="bg-primary-300 text-black hover:bg-primary-200"
        >
          Add Offer
        </Button>
      </div>
      <TableData
        data={data}
        idCol="offerId"
        excludeCols={["createdAt", "modifiedAt", "concernId", "managerId"]}
        objectCol="requiredProfile"
        actions={[
          (id) => (
            <FaTrash
              key={id}
              cursor="pointer"
              color="#F04040"
              onClick={async () => {
                await handleDeleteRequest(
                  `/offers/remove/${id}`,
                  null,
                  (error) =>
                    toast({
                      title: "Server Error !",
                      description: getErrorString(error.response?.data.message),
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
          (id, obj) => (
            <FaArchive
              key={id}
              cursor="pointer"
              className="text-primary-200"
              onClick={async () => {
                await handlePostRequest(
                  `/offers/archive/${id}`,
                  { status: !obj.isArchived },
                  (error) =>
                    toast({
                      title: "Server Error !",
                      description: getErrorString(error.response?.data.message),
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
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input {...register("title")} placeholder="Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input {...register("description")} placeholder="Description" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Input {...register("city")} placeholder="City" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Contract</FormLabel>
              <Input {...register("contract")} placeholder="contract" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>N# of positions</FormLabel>
              <Input
                type="number"
                defaultValue={1}
                min={1}
                {...register("nbOfPositions")}
                placeholder="N# of positions"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deadline</FormLabel>
              <Input type="date" min={1} {...register("deadline")} />
            </FormControl>

            <Controller
              name="type"
              control={control}
              defaultValue="JOB_OFFER"
              render={({ field }) => (
                <FormControl mt={4}>
                  <FormLabel>Offer Type</FormLabel>
                  <Select {...field}>
                    <option value="JOB_OFFER">Job Offer</option>
                    <option value="INTERNSHIP_OFFER">Internship Offer</option>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="location"
              control={control}
              defaultValue="OFFICE"
              render={({ field }) => (
                <FormControl mt={4}>
                  <FormLabel>Offer Type</FormLabel>
                  <Select {...field}>
                    <option value="OFFICE">Office</option>
                    <option value="REMOTE">Remote</option>
                    <option value="HYBRID">Hybrid</option>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="concernId"
              control={control}
              defaultValue={profiles.length != 0 ? profiles[0].profileId : -1}
              render={({ field }) => (
                <FormControl mt={4}>
                  <FormLabel>Profile</FormLabel>
                  <Select {...field}>
                    {profiles.map(({ profileId, requiredProfile }) => (
                      <option value={profileId} key={profileId}>
                        {profileId}
                        {" - "}
                        {requiredProfile}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={loading}
              onClick={handleSubmit(onSubmit)}
              colorScheme="blue"
              mr={3}
            >
              {loading ? <Spinner /> : "Add"}
            </Button>
            <Button
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
