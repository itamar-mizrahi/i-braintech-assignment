import "./App.css";
import WorkoutList from ".//components/WorkoutList";
import { useState } from "react";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHVXFxYuv_TRdYZKJ41VJOj4IGhPGjhU4",
  authDomain: "fitness-app-df7af.firebaseapp.com",
  projectId: "fitness-app-df7af",
  storageBucket: "fitness-app-df7af.appspot.com",
  messagingSenderId: "571073548594",
  appId: "1:571073548594:web:ea832ab4ed0c339bbf072b",
  measurementId: "G-STMNQ0W413"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function LogIn({ isLoggedIn }) {
    if (isLoggedIn) {
        return <SignIn setLogIn={setLogIn} />;
      }
      return <SignOut setLogIn={setLogIn} />;
  }
  
  function setLogIn(logInStatus) {
    setIsLoggedIn(logInStatus);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Fitness Tracking App</h1>

          <LogIn isLoggedIn={isLoggedIn} />
          <WorkoutList />
        </div>
      </header>
    </div>
  );
}


export default App;

