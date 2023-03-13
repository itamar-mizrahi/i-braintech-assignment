const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const db = admin.firestore();

// API endpoint to create a new user
exports.createUser = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const userRef = await db.collection('users').add(req.body);
      res.status(201).send(userRef.id);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    }
  });
});

// API endpoint to add a new workout to a user's profile
exports.addWorkout = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
});

// API endpoint to retrieve all workouts for a user
exports.getWorkouts = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
});
