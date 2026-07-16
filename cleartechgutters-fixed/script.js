(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      const select = document.querySelector('#service-interest');
      if (select) select.value = link.dataset.service || '';
    });
  });

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      item?.classList.toggle('open', !open);
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const photoInput = document.querySelector('#photos');
  const preview = document.querySelector('#file-preview');
  const uploadBox = document.querySelector('#upload-box');

  const renderFiles = (files) => {
    if (!preview) return;
    preview.innerHTML = '';
    [...files].slice(0, 8).forEach((file) => {
      const chip = document.createElement('div');
      chip.className = 'preview-chip';
      const img = document.createElement('img');
      img.alt = '';
      img.src = URL.createObjectURL(file);
      img.onload = () => URL.revokeObjectURL(img.src);
      const name = document.createElement('span');
      name.textContent = file.name;
      chip.append(img, name);
      preview.appendChild(chip);
    });
  };

  photoInput?.addEventListener('change', () => renderFiles(photoInput.files));

  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadBox?.addEventListener(eventName, (event) => {
      event.preventDefault();
      uploadBox.classList.add('dragging');
    });
  });
  ['dragleave', 'drop'].forEach((eventName) => {
    uploadBox?.addEventListener(eventName, (event) => {
      event.preventDefault();
      uploadBox.classList.remove('dragging');
    });
  });

  const form = document.querySelector('#quote-form');
  const status = document.querySelector('#form-status');

  const showStatus = (message, type) => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status show ${type}`;
  };

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    status?.classList.remove('show', 'error', 'success');

    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach((field) => {
      const fieldValid = field.checkValidity();
      field.classList.toggle('invalid', !fieldValid);
      if (!fieldValid) valid = false;
    });

    if (!valid) {
      showStatus('Please complete the required fields before sending your request.', 'error');
      form.querySelector('.invalid')?.focus();
      return;
    }

    if (form.company_website?.value) return;

    const endpoint = form.getAttribute('action') || '';
    if (endpoint.includes('REPLACE_WITH_FORM_ID')) {
      showStatus('The site design is ready, but the form endpoint still needs to be connected. See README.md for the one-line Formspree setup.', 'error');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalLabel = button?.innerHTML;
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');

      form.reset();
      if (preview) preview.innerHTML = '';
      showStatus('Thank you. Your quote request was sent successfully.', 'success');
    } catch (error) {
      showStatus('The request could not be sent. Please try again or email info@cleartechgutters.com.', 'error');
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = originalLabel;
      }
    }
  });

  form?.querySelectorAll('input, select, textarea').forEach((field) => {
    field.addEventListener('input', () => field.classList.remove('invalid'));
    field.addEventListener('change', () => field.classList.remove('invalid'));
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
