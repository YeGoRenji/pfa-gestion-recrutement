"use client";
import React, { useContext, useEffect } from "react";
import Input from "@/components/Input";

import { handlePostRequest } from "@/functions";
import {
  Button,
  Radio,
  RadioGroup,
  Select,
  FormControl,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
//import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm , UseFormSetValue } from "react-hook-form";
import AccessContext from "@/context/AccessContext";


type Props = {};



export default function Application({}: Props) {
  const [passmatch, setPassmatch] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const [access, _] = useContext(AccessContext);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, control ,setValue } = useForm<Inputs>({
    defaultValues: {
     // durationOfExp: 1,
      //offerId: 0,
    },
  });
  type Inputs = {
    offerId: number ;
    educationlvl: string;
    techSkills: string;
    durationOfExp: number;
  };




  useEffect(() => {

    const offerId = parseInt(params.id.toString(), 10);
    setValue("offerId", offerId);
    
  }, [params.id, setValue]);
 

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const aa= parseInt(data.durationOfExp.toString(), 10);
    setValue("durationOfExp", aa);
    data.durationOfExp=aa;

    setLoading(true);
    if (!access) {
     setLoading(false);
      return;
   }

   
    const res = await handlePostRequest(
      "/candidatures/offer",
      data,
      
      (error) => {
        toast({
          title: "Application Failed !",
          description: error.response?.data.message + typeof data.durationOfExp,
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
  

 
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-[100%]">

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100%] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Apply for offer
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
                </div>
                
                <div className="space-y-2 md:space-y-6 w-[48%]">
                  <Input
                    placeholder="Duration Of Experience"
                    label="Duration Of Experience"
                    name="durationOfExp"                   
                    register={register}
                    type="number"
                  />
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


