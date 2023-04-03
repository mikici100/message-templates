const templates = {
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

document.getElementById('templates').addEventListener('change', function () {
    document.getElementById('template-content').textContent = templates[this.value];
});

document.getElementById('template-content').textContent = templates['template1'];

function saveTemplate() {
    const selectedTemplate = document.getElementById('templates').value;
    templates[selectedTemplate] = document.getElementById('template-content').textContent;
    alert('Template saved successfully.');
}

document.getElementById('save-template').addEventListener('click', saveTemplate);
