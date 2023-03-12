import "./App.css";
import WorkoutList from ".//components/WorkoutList";
import SignIn from "./components/SIgnIn";
import SignOut from "./components/signOut";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Fitness Tracking App</h1>
          <SignIn/>
          <SignOut/>
          <WorkoutList />
        </div>
      </header>
    </div>
  );
}

export default App;
