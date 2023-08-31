"use client";
import React from 'react';
import Input from "@/components/Input";
import { Dropdown } from 'react-bootstrap';


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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Props = {};

type Inputs = {
  
  educationlvl: string;
  techSkills: string;
  type: string;
  desiredTechnology: string;
  internshipDuration: string;
 

};

export default function internship({}: Props) {
  const [passmatch, setPassmatch] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
     // internshipDuration: "0 ",
    },
  });

   const onSubmit: SubmitHandler<Inputs> = async (data) => {
     //if (data.password !== data.confirmpassword) {
     //  setPassmatch(false);
       return;
     }
  //    setPassmatch(true);
  //    setLoading(true);
  //    const res = await handlePostRequest(
  //      "/auth/signup",
  //      {
  //        ...data,
  //        gender: data.gender === '1' ? true : false,
  //        isAdmin: false,
  //      },
  //      (error) => {
  //        toast({
  //          title: "Register Failed !",
  //          description: error.response?.data.message,
  //          status: "error",
  //          duration: 3000,
  //         isClosable: true,
  //        });
  //      }
  //    );
  //    setLoading(false);
  //    if (res) {
  //      toast({
  //        title: "Register Successful !",
  //        description: null,
  //        status: "success",
  //        duration: 3000,
  //        isClosable: true,
  //      });
  //      localStorage.setItem("access_token", res.data.access_token);
  //      router.push("/");
  //    }
 //   };
 //#475163
 //#4C5866

 const comboBoxStyle = {
  backgroundColor: '#4C5869',
  color: '#FFFFFF',
  border: '0px ',
  padding: '10px',
  gap: '10px', 
  fontSize: '13px', // Taille de la police pour les options

}




  return (
 
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-cen ter mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Aji Tkhdem
        </Link>
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
                    name="educationlvl"
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
   

            { <Controller
          name="internshipDuration"
          
          control={control}
          //defaultValue="0"
          render={({ field }) => (
            <FormControl >
              <label style={{ fontSize: '14px'}}>Internship Duration</label>
   
              
              <Select  {...field} style={comboBoxStyle}>
                
                <option value="One"  style={{ color: "black" }}>One month</option>
                <option value="Two" style={{ color: "black" }}>Two month</option>
                <option value="Tree" style={{ color: "black" }}>Tree month</option>
                <option value="Four" style={{ color: "black" }}>Four month</option>
                <option value="Five" style={{ color: "black" }}>Five month</option>
                <option value="Six" style={{ color: "black" }}>Six month</option>
              </Select>
            </FormControl>
            
          )} 
       /> } 

         
            { <Controller
           name="type"
          

           control={control}
           //defaultValue="PFE"

           render={({ field }) => (
           
            
             <FormControl >
               <label style={{ fontSize: '14px'}}>Type Of Internship</label>
               <Select  {...field} style={comboBoxStyle}>
                 <option value="PFE"  style={{ color: "black" }}>PFE</option>
                 <option value="PFA" style={{ color: "black" }}>PFA</option>
                 <option value="Stage_ETE"  style={{ color: "black" }}>Stage ETE</option>
               </Select>
             </FormControl>
            
           )}
          /> } 

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
