"use client";
import Input from "@/components/Input";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { handlePostRequest } from "@/functions";

type Props = {};

type Inputs = {
  email: string;
  password: string;
};

export default function Login({}: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const res = await handlePostRequest(
      "/auth/signin",
      {
        ...data,
        isAdmin: false,
      },
      (error) => {
        toast({
          title: "Login Failed !",
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
        title: "Login Successful !",
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
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
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
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
