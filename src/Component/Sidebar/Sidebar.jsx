import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import GroupName from "../GroupName/GroupName";
import { Link } from "react-router-dom";

function Sidebar({left, right}) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [gName, setGName] = useState("");
  const [cColor, setCColor] = useState("");
  const [error, setError] = useState("");
  const [nError, setNError] = useState("");
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  function handleClickOutside(event) {
    if (event.target.className === "modal-page") {
      setShow(false);
    }
  }

  function modalHandle() {
    const newData = { ...data };

    if (!cColor) {
      setError("Please select a color!");
      return;
    }

    if (!gName) {
      setNError("please select a group name");
      return;
    }

    if (!newData[gName]) {
      newData[gName] = {
        message: [],
        color: cColor,
      };
    } 
    else {
      newData[gName].color = cColor;
    }

    localStorage.setItem("notes", JSON.stringify(newData));
    setData(newData);
    setGName("");
    setCColor("");
    setError("");
    setNError("");
    setShow(false);
  }

  function handleSelect(event) {
    setCColor(event.target.style.backgroundColor);
    setError("");
  }

  useEffect(() => {
    const arr = localStorage.getItem("notes");
    setData(arr ? JSON.parse(arr) : {});
  }, []);

  return (
    <>
      <div className="sidebar-page">
        <Link to='/' style={{color:"black"}}><h1>Pocket Notes</h1></Link>

        <div className="btn-add" onClick={() => setShow(true)}>
          <h2>+</h2>
        </div>

      </div>

      {show ? (
        <div className="modal-page" onClick={handleClickOutside}>
          <div className="modal-content">
            <p>Create New group</p>

            <span>Group Name</span>{" "}

            <input
              type="text"
              placeholder="Enter group name"
              value={gName}
              onChange={(e) => setGName(e.target.value)(setNError(""))}
            />

            {nError && (
              <p
                style={{
                  color: "red",
                  fontSize: "1rem",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                {nError}
              </p>
            )}

            <h5 className="modal-heading">
              Choose colour
              {colors.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className="modal-color"
                  onClick={handleSelect}
                />
              ))}
            </h5>

            {error && (
              <p
                style={{
                  color: "red",
                  fontSize: "1rem",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button className="modal-btn" onClick={modalHandle}>
              Create
            </button>
          </div>
        </div>
      ) : null}
      
      <div className="groupNames">
        {Object.keys(data).map((item, index) => (
          <GroupName key={index} gName={item} color={data[item].color} textColor={'black'} left={left} right={right} />
        ))}
      </div>
    </>
  );
}

export default Sidebar;
