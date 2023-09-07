import { UserType } from "@/types";
import { createContext } from "react";

const UserContext = createContext<[UserType | null, React.Dispatch<React.SetStateAction<UserType | null>>]>([null, () => null]);

export default UserContext;
