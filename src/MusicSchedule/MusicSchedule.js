import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MusicSchedule.css"; 

function MusicSchedule() {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/schedules")
      .then((response) => response.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Error fetching schedules:", error));
  }, []);

  const handleButtonClick = (userId, scheduleId) => {
    console.log("Navigating to /users/", userId, "/schedules/", scheduleId);
    navigate(`/users/${userId}/schedules/${scheduleId}`);
  };

  return (
    <div className="music-schedule-container">
      <h1>Music Festival Schedules</h1>
      {!schedules.length ? (
        <p>No schedules available at the moment.</p>
      ) : (
        <div className="button-container">
          {schedules.map((schedule) => (
            <button
              key={schedule.id}
              className="schedule-button"
              onClick={() => handleButtonClick(schedule.id, schedule.id)}
            >
              <div className="schedule-text">
                <h2 className="schedule-title">{schedule.title}</h2>
                <p className="schedule-date">{schedule.date}</p>
                <p className="user-id">{schedule.user}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MusicSchedule;