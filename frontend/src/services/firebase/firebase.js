import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require("dotenv").config();

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Inscription
  signUpUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion
  signOutUser = () => this.auth.signOut();

  // Récupérer le mot de passe
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // Mise à jour du mot de passe
  updatePassword = (password) => this.auth.currentUser.updatePassword(password);

  // Base de données
  userCollection = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;
