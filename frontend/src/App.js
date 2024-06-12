import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import SignOut from "./components/SignOut";
// import WorkoutList from ".//components/WorkoutList";
import Dashboard from "./components/Dashboard";
import AI from "./components/AI";

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
          {/* <AI/> */}
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-3c678821-7750-47a3-937f-2661439abb7a/bots/cr971_personalTrainer/canvas?__version__=2"
            title="Fitness Tracking App Chat"
            style={{
              width: "100%",
              height: "500px", // Increase the height to make it bigger
              border: "none",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
            }}
          ></iframe>
        </div>
      </header>
    </div>
  );
}

export default App;
