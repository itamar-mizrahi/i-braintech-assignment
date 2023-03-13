import "./App.css";
import WorkoutList from ".//components/WorkoutList";
import { useState } from "react";
import Login from "./components/Login";
import SignOut from "./components/SignOut";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function LoginCheck({ isLoggedIn }) {
    if (isLoggedIn) {
      return <Login setLogIn={setLogIn} />;
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

          <LoginCheck isLoggedIn={isLoggedIn} />
          {/* <Dashboard/>
          <WorkoutList /> */}
          <SignUp />
        </div>
      </header>
    </div>
  );
}

export default App;
