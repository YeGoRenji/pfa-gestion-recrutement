"use client";
import Input from "@/components/Input";
import { Button, Center, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { getErrorString, handlePostRequest } from "@/functions";
import UserContext from "@/context/userContext";

type Props = {};

type Inputs = {
  email: string;
  password: string;
};

export default function Admin({}: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, _] = useContext(UserContext);
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const res = await handlePostRequest(
      "/auth/signin",
      {
        ...data,
        isAdmin: true,
      },
      (error) => {
        toast({
          title: "Login Failed !",
          description: getErrorString(error.response?.data.message),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    );
    setLoading(false);
    if (res) {
      toast({
        title: "Login Successful !",
        description: null,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      localStorage.setItem("access_token", res.data.access_token);
      router.push('/admin/offers');
    }
  };

  return !user?.isAdmin ? (
    <section className="bg-gray-50 dark:bg-gray-900 h-[100%]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[100%] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in as Admin
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <Button
                isDisabled={loading}
                type="submit"
                colorScheme="blue"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Spinner /> : "Sign in"}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                If you don&apos;t have an account yet <br />
                Please contact the administration.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Center height="100%" textAlign="center">
      <Text fontSize="6xl">Welcome Admin, {user?.firstName}</Text>
    </Center>
  );
}
