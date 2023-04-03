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

// Load templates from localStorage or use default templates
const templates = JSON.parse(localStorage.getItem('messageTemplates')) || defaultTemplates;

function updateTemplateContent() {
    document.getElementById('template-content').textContent = templates[this.value];
}

function saveTemplate() {
    const selectedTemplate = document.getElementById('templates').value;
    templates[selectedTemplate] = document.getElementById('template-content').textContent;

    // Save templates to localStorage
    localStorage.setItem('messageTemplates', JSON.stringify(templates));

    alert('Template saved successfully.');
}

document.getElementById('templates').addEventListener('change', updateTemplateContent);
document.getElementById('save-template').addEventListener('click', saveTemplate);

// Initialize the content with the first template
document.getElementById('template-content').textContent = templates['template1'];
