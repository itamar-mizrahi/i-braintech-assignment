import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import axios from "axios";
import WorkoutList from "./WorkoutList";
import AddWorkout from "./AddWorkout";


const Login = ({ setLogIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [signed, setSigned] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const getWorkouts = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/workouts`
      );
      setWorkouts(response.data.filter(x => x));
      setIsLoading(true)
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        getWorkouts("vMJrGDjiIzfGK7ZYWSSO");

        setSigned(true)
        // setLogIn(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {IsLoading?<WorkoutList workouts={workouts}/>:(signed?<h1>Loading...</h1>:<div></div>)}
      {signed&&<AddWorkout getWorkouts={getWorkouts}/>}
    </div>
  );
};

export default Login;
