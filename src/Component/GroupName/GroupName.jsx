import React, { useContext, useEffect, useState } from "react";
import "./GroupName.css";
import { useNavigate } from "react-router-dom";
import { DisplayContext } from "../../DisplayProvider";

function GroupName({ gName,textColor,color,left,right }) {
  const [groupProfile, setgroupProfile] = useState("");
  const navigate = useNavigate();
  const {display, toggleDisplay} = useContext(DisplayContext)

  useEffect(() => {
    const words = gName.split(" ");
    let str = words[0].charAt(0).toUpperCase();
    if (words[1]) {
      str += words[1].charAt(0).toUpperCase();
    }
    setgroupProfile(str);
  }, [gName]);

  function handleClick() {
    if (window.innerWidth <= 768) {
      toggleDisplay("left");
      toggleDisplay("right");
    }
    navigate(`/group/${encodeURIComponent(gName)}`);
  }

  return (
    <>
      <div
        className="grp"
        onClick={() => handleClick()}
      >

        <div style={{ backgroundColor: color }} className="grp-name">
          <p>{groupProfile}</p>
        </div>
        
        <span style={{color:textColor}}>{gName}</span>
      </div>
    </>
  );
}

export default GroupName;
