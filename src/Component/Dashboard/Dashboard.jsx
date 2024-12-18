import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import GroupName from "../GroupName/GroupName";
import { DisplayContext } from "../../DisplayProvider";
function Dashboard() {
  const [data, setData] = useState({});
  const { groupName } = useParams();
  const [message, setmessage] = useState();
  const navigate = useNavigate()
  const {toggleDisplay} = useContext(DisplayContext)

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("notes")));
  }, []);

  function handleClick() {
    if (window.innerWidth <= 768) {
      toggleDisplay("left");
      toggleDisplay("right");
    }

    navigate(`/`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const notes = { ...data };
    const date = new Date();

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const newMessage = {
      msg: message,
      date: formattedDate,
      time: formattedTime,
    };
    notes[decodeURIComponent(groupName)].message.push(newMessage);
    localStorage.setItem("notes", JSON.stringify(notes));
    setmessage("");
    setData(notes);
  }

  return (
    <div className="dash-group">
      <div className="dash-nav">
        <h3 className="back-icon" onClick={handleClick}><i class="fa-solid fa-arrow-left"></i></h3>

        <GroupName
          gName={decodeURIComponent(groupName)}
          textColor={"white"}
          color={
            data && data[decodeURIComponent(groupName)]
              ? data[decodeURIComponent(groupName)].color
              : null
          }
        />
      </div>

      <div className="dash-msgs">
        {data && data[decodeURIComponent(groupName)]
          ? data[decodeURIComponent(groupName)].message.map((item, index) => {
              return (
                <div className="dash-msg" key={index}>
                  <p>{item.msg}</p>
                  <span>
                    {item.date} . {item.time}
                  </span>
                </div>
              );
            })
          : null}
      </div>

      <form className="dash-input" onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your text here..........."
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />

        <button
          type="submit"
          disabled={!message}
          className="msg-send"
          style={{
            color: !message ? "gray" : "blue",
          }}
        >

          <h3 className="icon"><i className="fa-solid fa-paper-plane"></i></h3>
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
