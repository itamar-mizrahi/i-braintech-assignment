import React from 'react';

function Navbar() {
  return (
    <nav>
      <div className="logo">Fitness Tracker</div>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Workouts</a></li>
        <li><a href="#">Plans</a></li>
      </ul>
      <button>Log Out</button>
    </nav>
  );
}

export default Navbar;
