import app from "firebase/app";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyANAaOfQvGCQPaRtHzttmT8guD8vGDcQ64",
  authDomain: "sismo-7caa6.firebaseapp.com",
  projectId: "sismo-7caa6",
  storageBucket: "sismo-7caa6.appspot.com",
  messagingSenderId: "200640907283",
  appId: "1:200640907283:web:b1fe59b0adb7c391fe57e6",
  measurementId: "G-33WZ35HSCZ",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
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
}

export default Firebase;
