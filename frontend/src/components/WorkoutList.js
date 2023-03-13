import React from 'react';

function WorkoutList({workouts}) {


  return (
    <div>
      <h2>My Workouts</h2>
      {workouts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration (minutes)</th>
              <th>Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout,id) => (
              <tr key={id}>
                <td>{workout.date}</td>
                <td>{workout.type}</td>
                <td>{workout.duration}</td>
                <td>{workout.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No workouts found or need log in</p>
      )}
    </div>
  );
}

export default WorkoutList;
