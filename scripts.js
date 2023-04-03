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

This is an example of template 2.

Kind regards,

[Your Name]
[Your Title]
[Your Company Name]
[Your Contact Information]`,
    template3: `Subject: Template 3

Hi [Recipient],

This is an example of template 3.

Sincerely,

[Your Name]
[Your Title]
[Your Company Name]
[Your Contact Information]`
};

// Replace with the Firebase configuration object you copied earlier
const firebaseConfig = {
    apiKey: "AIzaSyCubfHd72z0Yvp72rFNxKm98VeUXzEloXo",
    authDomain: "ella-b4af0.firebaseapp.com",
    databaseURL: "https://ella-b4af0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ella-b4af0",
    storageBucket: "ella-b4af0.appspot.com",
    messagingSenderId: "143960882717",
    appId: "1:143960882717:web:d27714e507661b727c50f4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

function loadTemplates(callback) {
    database.ref('messageTemplates').once('value', (snapshot) => {
        const templates = snapshot.val() || defaultTemplates;
        callback(templates);
    });
}

function saveTemplates(templates) {
    database.ref('messageTemplates').set(templates);
}

// Load templates from the database
loadTemplates((templates) => {
    function updateTemplateContent() {
        document.getElementById('template-content').textContent = templates[this.value];
    }

    function saveTemplate() {
        const selectedTemplate = document.getElementById('templates').value;
        templates[selectedTemplate] = document.getElementById('template-content').textContent;

        // Save templates to the database
        saveTemplates(templates);

        alert('Template saved successfully.');
    }

    document.getElementById('templates').addEventListener('change', updateTemplateContent);
    document
