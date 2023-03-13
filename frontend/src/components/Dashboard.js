import React, { useState, useEffect } from 'react';
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

const db = firebase.firestore();

function Dashboard() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Listen for authentication state changes
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        fetchWorkouts(user.uid);
      } else {
        setUser(null);
        setWorkouts([]);
      }
    });
  }, []);

  const fetchWorkouts = async userId => {
    try {
      const snapshot = await db.collection('workouts').where('userId', '==', userId).get();
      const workoutsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkouts(workoutsData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome {user.displayName}!</h2>
          <button onClick={handleLogout}>Logout</button>
          {workouts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Duration (minutes)</th>
                  <th>Calories Burned</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map(workout => (
                  <tr key={workout.id}>
                    <td>{workout.date}</td>
                    <td>{workout.type}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.caloriesBurned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No workouts found.</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Welcome to the Fitness Tracking App!</h2>
          <p>Please login to view your workouts.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;