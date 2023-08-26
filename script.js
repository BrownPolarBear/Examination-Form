document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('application-form');
  const personalSection = document.getElementById('personal-info');
  const academicSection = document.getElementById('academic-info');
  const academicNextButton = document.getElementById('academic-next');
  const contactSection = document.getElementById('contact-info');
  const contactNextButton = document.getElementById('contact-next');
  const submitButton = document.getElementById('submit-btn');
  const programSearchInput = document.getElementById('program-search-input');
  const programDropdown = document.getElementById('program');
  const attachmentsSection = document.getElementById('attachments');
  const attachmentsNextButton = document.getElementById('attachments-next');
  const sections = document.querySelectorAll('section');
  const saveButton = document.getElementById('save-progress');
  const nextButtons = document.querySelectorAll('.next-button');
  const cnicInputs = document.querySelectorAll('.cnic-input input[type="text"]');


  loadFormData();

  function validateCnic() {
    const cnicInput = document.getElementById('cnic');
    const cnicPattern = /^\d{5}-\d{7}-\d$/;

    if (!cnicPattern.test(cnicInput.value)) {
      alert('Please enter a valid CNIC in the format "xxxxx-xxxxxxx-x".');
      cnicInput.focus();
      return false;
    }

    return true;
  }

  cnicInputs.forEach((input, index) => {
    input.addEventListener('input', function () {
      if (this.value.length === this.maxLength) {
        if (index < cnicInputs.length - 1) {
          cnicInputs[index + 1].focus();
        } else {
          // Focus on the next form field or submit the form if CNIC is complete
          academicSection.classList.remove('hidden');
          // Handle other section navigation or form submission here
        }
      }
    });
  });

  personalNextButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (!validateCnic()) {
      return;
    }
    personalSection.classList.add('hidden');
    academicSection.classList.remove('hidden');
  });

  academicNextButton.addEventListener('click', function (event) {
    event.preventDefault();
    academicSection.classList.add('hidden');
    contactSection.classList.remove('hidden');
  });

  contactNextButton.addEventListener('click', function (event) {
    event.preventDefault();
    contactSection.classList.add('hidden');
    submitButton.classList.remove('hidden');
  });


  personalNextButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (!validateCnic()) {
      return;
    }

    personalSection.classList.add('hidden');
    academicSection.classList.remove('hidden');
  });

  academicNextButton.addEventListener('click', function (event) {
    event.preventDefault();
    academicSection.classList.add('hidden');
    contactSection.classList.remove('hidden');
  });

  contactNextButton.addEventListener('click', function (event) {
    event.preventDefault();
    contactSection.classList.add('hidden');
    submitButton.classList.remove('hidden');
  });

  nextButtons.forEach((button, index) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      sections[index].classList.add('hidden');
      if (index < sections.length - 1) {
        sections[index + 1].classList.remove('hidden');
      } else {
        alert('Form submitted successfully!');
      }
    });
  });

  programSearchInput.addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const options = programDropdown.querySelectorAll('option');

    options.forEach(option => {
      const optionText = option.textContent.toLowerCase();
      if (optionText.includes(searchValue)) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    });
  });

  attachmentsNextButton.addEventListener('click', function (event) {
    event.preventDefault();
    attachmentsSection.classList.add('hidden');
    document.getElementById('confirmation').classList.remove('hidden');
  });

  saveButton.addEventListener('click', function (event) {
    event.preventDefault();
    saveFormData();
    alert('Form progress saved.');
  });

  function saveFormData() {
    const formData = {};
    sections.forEach(section => {
      const fields = section.querySelectorAll('input, select, textarea');
      fields.forEach(field => {
        formData[field.name] = field.value;
      });
    });

    localStorage.setItem('formData', JSON.stringify(formData));
  }

  function loadFormData() {
    const formDataString = localStorage.getItem('formData');
    if (formDataString) {
      const formData = JSON.parse(formDataString);
      sections.forEach(section => {
        const fields = section.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
          if (formData[field.name] !== undefined) {
            field.value = formData[field.name];
          }
        });
      });
    }
  }
});
