// FlashContext.js
import { createContext, useContext, useState } from "react";

const FlashContext = createContext();

export const FlashProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const setFlash = (message) => {
    setFlashMessage(message);

    // Automatically clear the flash message after a certain time (e.g., 5 seconds)
    setTimeout(() => {
      setFlashMessage(null);
    }, 5000);
  };

  return <FlashContext.Provider value={{ flashMessage, setFlash }}>{children}</FlashContext.Provider>;
};

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context;
};
