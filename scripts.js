const firebaseConfig = {
    apiKey: "AIzaSyCubfHd72z0Yvp72rFNxKm98VeUXzEloXo",
    authDomain: "ella-b4af0.firebaseapp.com",
    databaseURL: "https://ella-b4af0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ella-b4af0",
    storageBucket: "ella-b4af0.appspot.com",
    messagingSenderId: "143960882717",
    appId: "1:143960882717:web:d27714e507661b727c50f4",
    measurementId: "G-LV3FT5E9T4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

const defaultTemplates = {
    template1: `Subject: Template 1

Dear [Recipient],

This is an example of template 1.

Best regards,

[Your Name]
[Your Title]
[Your Company Name]
[Your Contact Information]`,
    template2: `Subject: Template 2

Hello [Recipient],

This is an example
