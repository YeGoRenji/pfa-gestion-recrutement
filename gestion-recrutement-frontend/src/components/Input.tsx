import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = { name: string, placeholder?: string, label: string, type: string, register: UseFormRegister<any>};

export default function Input({ name, placeholder, label, type, register }: Props) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={true}
        {...register(name)}
      />
    </div>
  );
}
