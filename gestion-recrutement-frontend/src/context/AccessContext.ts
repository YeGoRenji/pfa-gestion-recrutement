import { createContext } from "react";

const AccessContext = createContext<[string | null, React.Dispatch<React.SetStateAction<string | null>>]>([null, () => null]);

export default AccessContext;
