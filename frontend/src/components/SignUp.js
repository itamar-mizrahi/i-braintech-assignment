import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', { email, password });
      setUserId(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddWorkout = async () => {
    try {
      await axios.post(`http://localhost:3000/users/${userId}/workouts`, { date, time, type, duration, caloriesBurned });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div> 
      {userId ? (
        <div>
          <h2>Add a workout</h2>
          <label>
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <br />
          <label>
            Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
          <br />
          <label>
            Type:
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
          </label>
          <br />
          <label>
            Duration (minutes):
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </label>
          <br />
          <label>
            Calories burned:
            <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} />
          </label>
          <br />
          <button onClick={handleAddWorkout}>Add workout</button>
        </div>
      ) : (
        <div>
          <h2>Or Sign up</h2>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button onClick={handleSignUp}>Sign up</button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
