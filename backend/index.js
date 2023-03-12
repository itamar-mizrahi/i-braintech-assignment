// Import required modules
const express = require('express');
const admin = require('firebase-admin');

// Initialize express app
const app = express();

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