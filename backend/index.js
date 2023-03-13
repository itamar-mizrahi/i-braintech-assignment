const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const serviceAccount = require('./fitness-app-df7af-firebase-adminsdk-14fmr-e7b0c4bc36.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
app.use(cors())

// API endpoint to create a new user
app.post('/users', async (req, res) => {
  try {
    const userRef = await db.collection('users').add(req.body);
    res.status(201).send(userRef.id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

// API endpoint to add a new workout to a user's profile
app.post('/users/:userId/workouts', async (req, res) => {
  try {
    const workoutRef = await db.collection('workouts').add({
      userId: req.params.userId,
      date: req.body.date,
      time: req.body.time,
      type: req.body.type,
      duration: req.body.duration,
      caloriesBurned: req.body.caloriesBurned
    });

    await db.collection('users').doc(req.params.userId).update({
      workoutIds: admin.firestore.FieldValue.arrayUnion(workoutRef.id)
    });

    res.status(201).send(workoutRef.id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding workout');
  }
});

// API endpoint to retrieve all workouts for a user
app.get('/users/:userId/workouts', async (req, res) => {
  try {
    const workoutIds = (await db.collection('users').doc(req.params.userId).get()).data().workoutIds;

    const workouts = [];

    for (const id of workoutIds) {
      const workout = (await db.collection('workouts').doc(id).get()).data();
      workouts.push(workout);
    }

    res.status(200).send(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving workouts');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

