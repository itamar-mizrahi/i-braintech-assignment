import React, { useState } from 'react';
import axios from 'axios';

function AddWorkout({getWorkouts}) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [userId, setUserId] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  // const handleSignUp = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:3000/users', { email, password });
  //     setUserId(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAddWorkout = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/users/vMJrGDjiIzfGK7ZYWSSO/workouts`, { date, time, type, duration, caloriesBurned });
      getWorkouts("vMJrGDjiIzfGK7ZYWSSO")
      console.log('here');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div> 
        <div>
          <form onSubmit={handleAddWorkout}>
          <h2>Add a workout</h2>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
          </label>
          <br />
          <label>
            Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>
          <br />
          <label>
            Type:
            <input type="text" value={type} onChange={(e) => setType(e.target.value)}  required/>
          </label>
          <br />
          <label>
            Duration (minutes):
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </label>
          <br />
          <label>
            Calories burned:
            <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Add workout</button>
        </form>
        </div>
    </div>
  );
}

export default AddWorkout;
