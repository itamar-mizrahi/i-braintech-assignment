// Import required modules
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize express app
const app = express();
app.use(cors())
// Initialize Firebase app
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-name.firebaseio.com'
});

// Create a reference to the workout collection
const workoutsRef = admin.firestore().collection('workouts');

// Define a route to create a new workout
app.post('/workouts', async (req, res) => {
  const { userId, date, type, duration, caloriesBurned } = req.body;

  // Create a new document in the workouts collection with the provided data
  const newWorkoutRef = workoutsRef.doc();
  const newWorkout = {
    userId,
    date,
    type,
    duration,
    caloriesBurned
  };
  await newWorkoutRef.set(newWorkout);

  res.json({ id: newWorkoutRef.id });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000.'));