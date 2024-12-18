import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Component/Sidebar/Sidebar";
import Note from "./Component/Note/Note";
import Dashboard from "./Component/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { DisplayContext } from "./DisplayProvider";

function App() {
  const {display, toggleDisplay} = useContext(DisplayContext);
  const [childData, setChildData] = useState("");
  const [childIndex, setChildIndex] = useState();
  const [leftDisplay, setleftDisplay] = useState('block')
  const [rightDisplay, setrightDisplay] = useState('block')

  function handleChildData(data, index) {
    setChildData(data);
    setChildIndex(index);
    console.log(childIndex);
    console.log(childData);
  }

  useEffect(() => {
    const handlePopState = () => {
      if (window.innerWidth <= 768) {
        toggleDisplay("left");
        toggleDisplay("right");
      }
    };

    const updateDisplayOnResize = () => {
      if (window.innerWidth <= 768) {
        setleftDisplay(display.left);
        setrightDisplay(display.right);
      } else {
        setleftDisplay("block"); 
        setrightDisplay("block");
      }
    };

    updateDisplayOnResize();

    window.addEventListener("resize", updateDisplayOnResize);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("resize", updateDisplayOnResize);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [display]);

  return (
    <>
      <div className="main">
        <div className="left" style={{display: leftDisplay}}>
          <Sidebar dataView={handleChildData} />
        </div>
        
        <div className="right" style={{display: rightDisplay}}>
          <Routes>
            <Route path="/" element={<Note />} />
            <Route path="/group/:groupName" element={<Dashboard />} />
            <Route path="*" element={<Note />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;