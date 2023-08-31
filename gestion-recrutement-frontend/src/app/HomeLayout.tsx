import AccessContext from "@/context/AccessContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";

type Props = { children: React.ReactNode };

export default function HomeLayout({ children }: Props) {
  const navs: { label: string; route: string }[] = [
    { label: "HOME", route: "/" },
    { label: "INTERNSHIP", route: "http://localhost:3000/internship" },
    { label: "JOB", route: "http://localhost:3000/job" },
  ];

  const [access, setAccess] = useContext(AccessContext);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="md:h-screen dark:text-white grid grid-rows-[60px_auto]">
        <nav className="dark:bg-gray-800 flex items-center justify-between px-10">
          <Link href="/">
            <strong className="flex gap-2 items-center">
              <FaGraduationCap /> Aji Tkhdem
            </strong>
          </Link>
          <div className="w-[50%] flex justify-around">
            {navs.map((elt, index) => (
              <Link key={index} href={elt.route}>
                {elt.label}
              </Link>
            ))}
          </div>
          <div>
            {access ? (
              <div className="flex gap-5">
                <Link href="#">PROFILE</Link>
                <button
                  className="text-red-400"
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    setAccess(null);
                  }}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link href="/login">LOGIN</Link>
            )}
          </div>
        </nav>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
