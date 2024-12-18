import React, { createContext, useState } from "react";

export const DisplayContext = createContext();

export const DisplayProvider = ({ children }) => {
  const [display, setDisplay] = useState({ left: "block", right: "none" });

  const toggleDisplay = (side) => {
    setDisplay((prevState) => ({
      ...prevState,
      [side]: prevState[side] === "none" ? "block" : "none",
    }));
  };

  return (
    <DisplayContext.Provider value={{ display, toggleDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};
