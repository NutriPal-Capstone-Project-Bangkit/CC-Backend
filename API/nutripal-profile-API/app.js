const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebaseAdmin = require("firebase-admin");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const serviceAccount = require("ServiceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "nutripal-4bd4e.firebasestorage.app",
});

const bucket = firebaseAdmin.storage().bucket();
const db = firebaseAdmin.firestore();
const upload = multer({ storage: multer.memoryStorage() });

// Function to get a Firebase User from UID
async function getFirebaseUser(uid) {
  try {
    const userRecord = await firebaseAdmin.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    return null;
  }
}

// Function to upload file to Firebase Storage
async function uploadToFirebase(file) {
  const destination = `profile-pictures/${Date.now()}-${file.originalname}`;
  const blob = bucket.file(destination);

  const stream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
      resolve(publicUrl);
    });

    stream.on("error", (err) => {
      reject(err);
    });

    stream.end(file.buffer); // Use buffer directly from multer
  });
}

// Function to delete file from Firebase Storage
async function deleteFromFirebase(filename) {
  const file = bucket.file(filename);
  try {
    await file.delete();
    console.log(`File ${filename} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting file ${filename}:`, error);
  }
}

// Endpoint to get the profile of a user
app.get("/profile/:uid", async (req, res) => {
  try {
    const requestedUid = req.params.uid;

    const user = await getFirebaseUser(requestedUid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const doc = await db.collection("profiles").doc(requestedUid).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// Endpoint to create a profile
app.post("/profile", upload.single("profilePicture"), async (req, res) => {
  try {
    const { uid, name, gender, age, weight, height, activityLevel, lifestyle } =
      req.body;

    const user = await getFirebaseUser(uid);
    if (!user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    let profilePicture = null;
    if (req.file) {
      profilePicture = await uploadToFirebase(req.file);
    }

    const profile = {
      uid,
      name,
      gender,
      age,
      weight,
      height,
      activityLevel,
      lifestyle,
      profilePicture,
    };

    await db.collection("profiles").doc(uid).set(profile);

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
});

// Endpoint to update a profile
app.put("/profile/:uid", upload.single("profilePicture"), async (req, res) => {
  try {
    const requestedUid = req.params.uid;

    const user = await getFirebaseUser(requestedUid);
    if (!user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const doc = await db.collection("profiles").doc(requestedUid).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const { name, gender, age, weight, height, activityLevel, lifestyle } =
      req.body;

    const currentProfile = doc.data();
    let profilePicture = currentProfile.profilePicture;

    if (req.file) {
      if (profilePicture) {
        const oldFilename = profilePicture.split("/").pop();
        await deleteFromFirebase(`profile-pictures/${oldFilename}`);
      }

      profilePicture = await uploadToFirebase(req.file);
    }

    const updatedProfile = {
      ...currentProfile,
      name: name || currentProfile.name,
      gender: gender || currentProfile.gender,
      age: age || currentProfile.age,
      weight: weight || currentProfile.weight,
      height: height || currentProfile.height,
      activityLevel: activityLevel || currentProfile.activityLevel,
      lifestyle: lifestyle || currentProfile.lifestyle,
      profilePicture,
    };

    await db.collection("profiles").doc(requestedUid).set(updatedProfile);

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

// Endpoint to delete a profile
app.delete("/profile/:uid", async (req, res) => {
  try {
    const requestedUid = req.params.uid;

    const user = await getFirebaseUser(requestedUid);
    if (!user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const doc = await db.collection("profiles").doc(requestedUid).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const currentProfile = doc.data();

    if (currentProfile.profilePicture) {
      const oldFilename = currentProfile.profilePicture.split("/").pop();
      await deleteFromFirebase(`profile-pictures/${oldFilename}`);
    }

    await db.collection("profiles").doc(requestedUid).delete();

    res.json({
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
