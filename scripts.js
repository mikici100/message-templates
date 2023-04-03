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
    template1: 'Template 1 content',
    template2: 'Template 2 content',
    template3: 'Template 3 content'
};

function loadTemplates(callback) {
    database.ref('messageTemplates').once('value', (snapshot) => {
        const data = snapshot.val() || { templates: defaultTemplates, names: { template1: 'Template 1', template2: 'Template 2', template3: 'Template 3' } };
        callback(data.templates, data.names);
    });
}

function saveTemplates(templates, names) {
    database.ref('messageTemplates').set({ templates, names });
}

loadTemplates((templates, names) => {
    function updateTemplateContent() {
        document.getElementById('template-content').value = templates[this.value];
    }

    function saveTemplate() {
        const selectedTemplate = document.getElementById('templates').value;
        templates[selectedTemplate] = document.getElementById('template-content').value;

        // Save templates to the database
        saveTemplates(templates, names);

        alert('Template saved successfully.');
    }

    function addTemplate() {
        const templateName = prompt("Enter the name of the new template:");
        if (templateName) {
            const templateKey = `template${Object.keys(templates).length + 1}`;
            templates[templateKey] = '';
            names[templateKey] = templateName;

            const option = document.createElement('option');
            option.value = templateKey;
            option.textContent = templateName;
            document.getElementById('templates').appendChild(option);

            // Save templates to the database
            saveTemplates(templates, names);
        }
    }

    function renameTemplate() {
        const selectedTemplate = document.getElementById('templates').value;
        const newName = prompt("Enter the new name for the template:", names[selectedTemplate]);
        if (newName) {
            names[selectedTemplate] = newName;
            const option = document.querySelector(`#templates option[value="${selectedTemplate}"]`);
            option.textContent = newName;

            // Save templates to the database
            saveTemplates(templates, names);
        }
    }

    // Populate the template dropdown
    for (const key in names) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = names[key];
        document.getElementById('templates').appendChild(option);
    }

    document.getElementById('templates').addEventListener('change', updateTemplateContent);
    document.getElementById('save-template').addEventListener('click', saveTemplate);
    document.getElementById('add-template').addEventListener('click', addTemplate);
    document.getElementById('rename-template').addEventListener('click', renameTemplate);

       // Initialize the textarea with the first template
       if (Object.keys(templates).length > 0) {
        document.getElementById('templates').selectedIndex = 0;
        document.getElementById('template-content').value = templates[Object.keys(templates)[0]];
    }
});

