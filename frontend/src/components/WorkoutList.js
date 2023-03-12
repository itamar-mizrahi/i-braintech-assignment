import React, { useEffect, useState } from 'react';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch the list of workouts from the backend API
    fetch('/workouts')
      .then(response => response.json())
      .then(data => setWorkouts(data));
  }, []);

  return (
    <div>
      <h2>My Workouts</h2>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>
            <div>Date: {workout.date}</div>
            <div>Type: {workout.type}</div>
            <div>Duration: {workout.duration} minutes</div>
            <div>Calories burned: {workout.caloriesBurned}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
