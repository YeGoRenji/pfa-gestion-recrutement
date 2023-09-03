"use client"
import AccessContext from "@/context/AccessContext";
import { Metadata } from "next";
import Link from "next/link";
import { useContext } from "react";
import { RiAdminFill } from 'react-icons/ri'

const CoolLink  = ({ children } : { children : React.ReactNode }) => {
  return (
    <div className="transition-transform hover:-translate-y-[0.1rem]">
      {children}
    </div>
  )
}

export const metadata: Metadata = {
  title: "Admin",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navs: { label: string; route: string }[] = [
    { label: "HOME", route: "/" },
    { label: "OFFERS", route: "/admin/offers" },
    { label: "PROFILES", route: "/admin/profiles" },
    { label: "APPLICATIONS", route: "/admin/apps" },
  ];

  const [access, setAccess] = useContext(AccessContext);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="md:h-screen dark:text-white grid grid-rows-[60px_auto]">
        <nav className="dark:bg-gray-800 flex items-center justify-between px-10">
          <Link href="/admin">
            <strong className="flex gap-2 items-center">
              <RiAdminFill /> Admin Page
            </strong>
          </Link>
          <div className="w-[50%] flex justify-around">
            {navs.map((elt, index) => (
              <Link key={index} href={elt.route}>
                <CoolLink>
                  {elt.label}
                </CoolLink>
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
              <Link href="#">LOGIN</Link>
            )}
          </div>
        </nav>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
