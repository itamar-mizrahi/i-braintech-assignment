import "./App.css";
import WorkoutList from ".//components/WorkoutList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Fitness Tracking App</h1>
          <WorkoutList />
        </div>
      </header>
    </div>
  );
}

export default App;
