import MoveUpLink from "@/components/MoveUpLink";
import AccessContext from "@/context/AccessContext";
import UserContext from "@/context/UserContext";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { FaGraduationCap, FaSuitcase } from "react-icons/fa";

type Props = { children: React.ReactNode };

export default function HomeLayout({ children }: Props) {
  const navs: { label: string; route: string }[] = [
    { label: "HOME", route: "/" },
    { label: "INTERNSHIP", route: "/internship" },
    { label: "JOB", route: "/job" },
  ];

  const [access, setAccess] = useContext(AccessContext);
  const [user, setUser] = useContext(UserContext);
  const [icon, setIcon] = useState<React.ReactNode>(<FaGraduationCap />);
  const router = useRouter();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="md:h-screen dark:text-white grid grid-rows-[60px_auto]">
        <nav className="dark:bg-gray-800 flex items-center justify-between px-10">
          <Link href="/">
            <strong
              onMouseEnter={() => setIcon(<FaSuitcase />)}
              onMouseLeave={() => setIcon(<FaGraduationCap />)}
              className="group flex gap-2 items-center"
            >
              <div className="group-hover:animate-bounce">{icon}</div>
              <div>Aji Tkhdem</div>
            </strong>
          </Link>
          <div className="w-[50%] flex justify-around">
            {navs.map((elt, index) => (
              <Link key={index} href={elt.route}>
                <MoveUpLink>{elt.label}</MoveUpLink>
              </Link>
            ))}
          </div>
          <div>
            {access ? (
              <div className="flex gap-5">
                <Text>
                  {user?.firstName}, {user?.lastName}
                </Text>
                {!user?.isAdmin && (
                  <>
                    <Box width="1px" className="bg-red-400"/>
                    <Link href="/profile">PROFILE</Link>
                  </>
                )}
                <button
                  className="text-red-400"
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    setAccess(null);
                    setUser(null);
                    router.push("/");
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
        <div className="p-5 h-[100%] overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
}
