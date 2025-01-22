import React, { useState, useEffect } from "react";
import "./DetailedSchedule.css";
import { useParams } from "react-router-dom";

function DetailedSchedule() {
  const { userId, scheduleId } = useParams(); 
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/users/${userId}/schedules/${scheduleId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const sortedShows = data.shows.sort((a, b) => {
          const timeA = new Date(a.time); 
          const timeB = new Date(b.time); 
          return timeA - timeB; 
        });

        setSchedule({ ...data, shows: sortedShows });
      })
      .catch((error) => {
        console.error("Error fetching schedule:", error);
        setError(error.message);
      });
  }, [scheduleId, userId]);



  const removeShow = (showId) => {
    fetch(`http://localhost:3000/api/v1/users/${userId}/schedules/${scheduleId}/shows/${showId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error removing show: ${response.status}`);
        }
        setSchedule((prevSchedule) => ({
          ...prevSchedule,
          shows: prevSchedule.shows.filter(show => show.id !== showId),
        }));
      })
      .catch((error) => {
        console.error("Error removing show:", error);
        setError(error.message);
      });
  };


  

  if (error) {
    return <p>Error loading schedule: {error}</p>;
  }

  if (!schedule) {
    return <p>Loading schedule...</p>;
  }

  const { schedule: details, shows, user } = schedule;

  return (
    <main>
      <h1>Detailed Music Festival Schedule</h1>
      <h2>{details.title}</h2>
      <p>Date: {details.date}</p>
      <h3>Created By:</h3>
      <p>
        {user.first_name} {user.last_name}
      </p>
      <h3>Shows:</h3>
      <sectio className="showContainer">
        <ul>
          {shows.map((show) => (
            <li key={show.id}>
              <h4>{show.artist}</h4>
        
              <p>Show Details:</p>
              <img
                src={`http://localhost:3000${show.image_url}`}
                alt={`Show image for ${show.artist}`}
                onError={(e) => (e.target.src = '/images/default_show_image.jpg')} 
                />
              <p>Date: {show.date}</p>
              <p>Time: {show.time}</p>
              <button onClick={() => removeShow(show.id)}>Remove Show</button>
            </li>
          ))}
        </ul>
        </sectio>
    </main>
  );
}

export default DetailedSchedule;
