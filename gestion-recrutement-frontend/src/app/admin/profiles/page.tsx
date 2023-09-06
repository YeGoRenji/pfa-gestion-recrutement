"use client";
import TableData from "@/components/TableData";
import TagList from "@/components/TagList";
import AccessContext from "@/context/AccessContext";
import { handleDeleteRequest, handleGetRequest, handlePostRequest } from "@/functions";
import { ProfileType } from "@/types";
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";

type Props = {};

export default function Profiles({}: Props) {
  const [data, setData] = useState<ProfileType[]>([]);
  const [access, _] = useContext(AccessContext);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  type Inputs = {
    description: string;
    requiredProfile: string;
    desiredSkills: string[];
    stronglyAppreciate: string[];
    languages: string[];
  };

  const { register, handleSubmit, setValue, reset } = useForm<Inputs>({});

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!access)
      return;
    const res = await handlePostRequest('/profiles/create', data,
      (error) => {
        toast({
          title: "Add Profile Failed !",
          description: error.response?.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
      access
    )
    if (res)
      fetchData();
  };

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

  const addProfile = () => {
    onOpen();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row-reverse mb-2">
        <Button
          onClick={() => addProfile()}
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
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={() => {onClose(); reset();}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Profile</ModalHeader>
          <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Required Profile</FormLabel>
                <Input
                  {...register("requiredProfile")}
                  placeholder="Required profile"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input {...register("description")} placeholder="Description" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Desired Skills</FormLabel>
                <TagList
                  onChange={(tags) => setValue("desiredSkills", tags)}
                  name="desiredSkills"
                  placeHolder="Add Desired Skill"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Strongly Appreciate</FormLabel>
                <TagList
                  onChange={(tags) => setValue("stronglyAppreciate", tags)}
                  name="stronglyAppreciate"
                  placeHolder="Add Strongly Appreciate"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Languages</FormLabel>
                <TagList
                  onChange={(tags) => setValue("languages", tags)}
                  name="languages"
                  placeHolder="Add Language"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleSubmit(onSubmit)} colorScheme="blue" mr={3}>
                Add
              </Button>
              <Button onClick={() => {onClose(); reset()}}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
