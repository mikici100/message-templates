// ...

function loadTemplates(callback) {
    database.ref('messageTemplates').once('value', (snapshot) => {
        const data = snapshot.val() || { templates: defaultTemplates, names: { template1: 'Template 1', template2: 'Template 2', template3: 'Template 3' } };
        callback(data.templates, data.names);
    });
}

function saveTemplates(templates, names) {
    database.ref('messageTemplates').set({ templates, names });
}

// Load templates from the database
loadTemplates((templates, names) => {
    function updateTemplateContent() {
        document.getElementById('template-content').textContent = templates[this.value];
    }

    function saveTemplate() {
        const selectedTemplate = document.getElementById('templates').value;
        templates[selectedTemplate] = document.getElementById('template-content').textContent;

        // Save templates to the database
        saveTemplates(templates, names);

        alert('Template saved successfully.');
    }

    function addTemplate() {
        const templateName = prompt("Enter the name of the new template:");
        if (templateName) {
            const templateId = `template${Object.keys(templates).length + 1}`;
            templates[templateId] = "";
            names[templateId] = templateName;
            const option = document.createElement('option');
            option.value = templateId;
            option.textContent = templateName;
            document.getElementById('templates').appendChild(option);
            document.getElementById('templates').value = templateId;
            updateTemplateContent.call({ value: templateId });

            // Save templates to the database
            saveTemplates(templates, names);
        }
    }

    function renameTemplate() {
        const selectedTemplate = document.getElementById('templates').value;
        const templateName = prompt("Enter the new name of the template:", names[selectedTemplate]);
        if (templateName) {
            const option = document.querySelector(`#templates option[value=${selectedTemplate}]`);
            option.textContent = templateName;
            names[selectedTemplate] = templateName;

            // Save templates to the database
            saveTemplates(templates, names);
        }
    }

    // Populate the templates dropdown
    const templatesSelect = document.getElementById('templates');
    templatesSelect.innerHTML = '';
    for (const templateId in names) {
        const option = document.createElement('option');
        option.value = templateId;
        option.textContent = names[templateId];
        templatesSelect.appendChild(option);
    }

    document.getElementById('templates').addEventListener('change', updateTemplateContent);
    document.getElementById('save-template').addEventListener('click', saveTemplate);
    document.getElementById('add-template').addEventListener('click', addTemplate);
    document.getElementById('rename-template').addEventListener('click', renameTemplate);

    updateTemplateContent.call({ value: 'template1' });
});

// ...
