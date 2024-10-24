import AuthModalContext from "@/components/contexts/AuthModalContext";
import { useContext } from "react";

const useAuthModalContext = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      "useAuthModalContext must be used within a AuthModalProvider"
    );
  }

  return context;
};

export default useAuthModalContext;
