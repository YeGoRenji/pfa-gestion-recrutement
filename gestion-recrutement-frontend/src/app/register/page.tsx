"use client";
import Input from "@/components/Input";
import { handlePostRequest } from "@/functions/utils";
import {
  Button,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Props = {};

type Inputs = {
  email: string;
  password: string;
  confirmpassword: string;
  gender: string;
  address: string;
  phone: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
};

export default function Register({}: Props) {
  const [passmatch, setPassmatch] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      gender: "0",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.confirmpassword) {
      setPassmatch(false);
      return;
    }
    setPassmatch(true);
    setLoading(true);
    const res = await handlePostRequest(
      "/auth/signup",
      {
        ...data,
        gender: data.gender === '1' ? true : false,
        isAdmin: false,
      },
      (error) => {
        toast({
          title: "Register Failed !",
          description: error.response?.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
    setLoading(false);
    if (res) {
      toast({
        title: "Register Successful !",
        description: null,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("access_token", res.data.access_token);
      router.push("/");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Aji Tkhdem
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between">
                <div className="space-y-2 md:space-y-6 w-[48%]">
                  <div className="flex gap-3">
                    <Input
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      label="First Name"
                      register={register}
                    />
                    <Input
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      label="Last Name"
                      register={register}
                    />
                  </div>
                  <Input
                    label="Email"
                    placeholder="example@domain"
                    type="email"
                    name="email"
                    register={register}
                  />
                  <Input
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    label="Password"
                    register={register}
                  />
                  <Input
                    placeholder="••••••••"
                    type="password"
                    name="confirmpassword"
                    label="Confirm Password"
                    register={register}
                  />
                  {!passmatch && (
                    <div className="!mt-1 text-sm text-red-700">
                      Password dont match !
                    </div>
                  )}
                </div>
                <div className="space-y-2 md:space-y-6 w-[48%]">
                  <Input
                    placeholder="Address"
                    label="Address"
                    name="address"
                    register={register}
                    type="text"
                  />
                  <Input
                    placeholder="+212XXXXXXXXX"
                    label="Phone"
                    name="phone"
                    register={register}
                    type="tel"
                  />
                  <Input
                    label="Date of birth"
                    name="dateOfBirth"
                    register={register}
                    type="date"
                  />
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} defaultValue="0">
                        <Stack direction="row">
                          <Radio value="0">Male</Radio>
                          <Radio value="1">Female</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>
              <Button
                isDisabled={loading}
                type="submit"
                colorScheme="blue"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Spinner /> : "Create an account"}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
