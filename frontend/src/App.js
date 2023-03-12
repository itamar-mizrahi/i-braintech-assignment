import "./App.css";
import WorkoutList from ".//components/WorkoutList";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

const firebaseConfig = {
  apiKey: "AIzaSyAHVXFxYuv_TRdYZKJ41VJOj4IGhPGjhU4",
  authDomain: "fitness-app-df7af.firebaseapp.com",
  projectId: "fitness-app-df7af",
  storageBucket: "fitness-app-df7af.appspot.com",
  messagingSenderId: "571073548594",
  appId: "1:571073548594:web:ea832ab4ed0c339bbf072b",
  measurementId: "G-STMNQ0W413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

