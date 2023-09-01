"use client";
import React, { useContext } from "react";
import Input from "@/components/Input";

import { handlePostRequest } from "@/functions";
import {
  Button,
  Select,
  FormControl,
  Spinner,
  useToast,
} from "@chakra-ui/react";
//import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AccessContext from "@/context/AccessContext";

type Props = {};

type Inputs = {
  educationLvl: string;
  techSkills: string;
  type: "PFE" | "PFA" | "Stage_ETE";
  desiredTechnology: string;
  internshipDuratio: number;
};

export default function Internship({}: Props) {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [access, _] = useContext(AccessContext);
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      internshipDuratio: 1,
      type: "PFE",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    if (!access) {
      setLoading(false);
      return;
    }
    const res = await handlePostRequest(
      "/candidatures/internship",
      data,
      (error) => {
        toast({
          title: "Application Failed !",
          description: error.response?.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
      access
    );
    setLoading(false);
    if (res) {
      toast({
        title: "Application sent !",
        description: null,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    }
  };
  //#475163
  //#4C5866

  const comboBoxStyle = {
    backgroundColor: "#4C5869",
    color: "#FFFFFF",
    border: "0px ",
    padding: "10px",
    gap: "10px",
    fontSize: "13px", // Taille de la police pour les options
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-[100%]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100%] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Apply for an Internship
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between">
                <div className="space-y-2 md:space-y-6 w-[48%]">
                  <Input
                    placeholder="Education Level"
                    label="Education Level"
                    name="educationLvl"
                    register={register}
                    type="text"
                  />

                  <Input
                    placeholder="Technical skills"
                    label="Technical skills"
                    name="techSkills"
                    register={register}
                    type="text"
                  />
                  <Input
                    placeholder="Desired Technology"
                    label="Desired Technology"
                    name="desiredTechnology"
                    register={register}
                    type="text"
                  />
                </div>
                <div className="space-y-2 md:space-y-6 w-[48%]">
                  {
                    <Controller
                      name="internshipDuratio"
                      control={control}
                      defaultValue={1}
                      render={({ field }) => (
                        <FormControl>
                          <label style={{ fontSize: "14px" }}>
                            Internship Duration
                          </label>

                          <Select {...field} style={comboBoxStyle}>
                            <option value="1" style={{ color: "black" }}>
                              One month
                            </option>
                            <option value="2" style={{ color: "black" }}>
                              Two month
                            </option>
                            <option value="3" style={{ color: "black" }}>
                              Tree month
                            </option>
                            <option value="4" style={{ color: "black" }}>
                              Four month
                            </option>
                            <option value="5" style={{ color: "black" }}>
                              Five month
                            </option>
                            <option value="6" style={{ color: "black" }}>
                              Six month
                            </option>
                          </Select>
                        </FormControl>
                      )}
                    />
                  }

                  {
                    <Controller
                      name="type"
                      control={control}
                      //defaultValue="PFE"

                      render={({ field }) => (
                        <FormControl>
                          <label style={{ fontSize: "14px" }}>
                            Type Of Internship
                          </label>
                          <Select {...field} style={comboBoxStyle}>
                            <option value="PFE" style={{ color: "black" }}>
                              PFE
                            </option>
                            <option value="PFA" style={{ color: "black" }}>
                              PFA
                            </option>
                            <option
                              value="Stage_ETE"
                              style={{ color: "black" }}
                            >
                              Stage ETE
                            </option>
                          </Select>
                        </FormControl>
                      )}
                    />
                  }
                </div>
              </div>
              <Button
                isDisabled={loading}
                type="submit"
                colorScheme="blue"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Spinner /> : "Apply Now"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
