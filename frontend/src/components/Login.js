import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import axios from "axios";
import WorkoutList from "./WorkoutList";


const Login = ({ setLogIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workouts, setWorkouts] = useState([]);

  const getWorkouts = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/workouts`
      );
      // console.log("Workouts for user:", response.data);
      // setWorkouts([...response.data]);
      // console.log([...response.data]);
      return response.data;
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
        let data = await getWorkouts("vMJrGDjiIzfGK7ZYWSSO");
        console.log(data);
        setWorkouts(data);
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
      <h1>Login</h1>
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
      <WorkoutList workouts={workouts}/>
      
    </div>
  );
};

export default Login;
