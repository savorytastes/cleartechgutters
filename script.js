(() => {
  const PHONE_DISPLAY = '412-228-0405';
  const PHONE_TEL = '+14122280405';
  const onHomepage = location.pathname === '/' || location.pathname.endsWith('/index.html');

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

  if (nav && !nav.querySelector('a[href*="service-areas.html"]')) {
    const quoteButton = nav.querySelector('a.button');
    const areaLink = document.createElement('a');
    areaLink.href = onHomepage ? 'service-areas.html' : '/service-areas.html';
    areaLink.textContent = 'Service areas';
    nav.insertBefore(areaLink, quoteButton || null);
  }

  if (nav && !nav.querySelector('a[href^="tel:"]')) {
    const quoteButton = nav.querySelector('a.button');
    const callLink = document.createElement('a');
    callLink.href = `tel:${PHONE_TEL}`;
    callLink.textContent = 'Call';
    nav.insertBefore(callLink, quoteButton || null);
  }

  if (onHomepage) {
    const eyebrow = document.querySelector('.hero-copy .eyebrow');
    const heroHeading = document.querySelector('.hero-copy h1');
    if (eyebrow) eyebrow.innerHTML = '<span class="eyebrow-dot"></span> Pittsburgh gutter cleaning';
    if (heroHeading) heroHeading.innerHTML = 'Gutter cleaning in Pittsburgh.<br/><span>Cleaner gutters, better protection.</span>';

    const areaCard = document.querySelector('.service-area .area-card > div:last-child');
    if (areaCard && !areaCard.querySelector('a[href*="service-areas.html"]')) {
      const areaPageLink = document.createElement('a');
      areaPageLink.className = 'text-link text-link-light';
      areaPageLink.href = 'service-areas.html';
      areaPageLink.innerHTML = 'View our Pittsburgh service areas <span aria-hidden="true">→</span>';
      areaCard.appendChild(areaPageLink);
    }
  }

  const priceCards = document.querySelectorAll('.pricing-grid .price-card');
  const pricing = [
    ['Simple gutters', '$99'],
    ['Most 2-story homes', '$129'],
    ['Large / complex', '$149']
  ];
  priceCards.forEach((card, index) => {
    if (!pricing[index]) return;
    const [name, price] = pricing[index];
    const nameNode = card.querySelector('.plan-name');
    const priceNode = card.querySelector('.price');
    if (nameNode) nameNode.textContent = name;
    if (priceNode) priceNode.textContent = price;
  });

  const heroActions = document.querySelector('.hero-actions');
  if (heroActions && !heroActions.querySelector('a[href^="tel:"]')) {
    const call = document.createElement('a');
    call.className = 'button button-ghost';
    call.href = `tel:${PHONE_TEL}`;
    call.textContent = `Call ${PHONE_DISPLAY}`;

    const text = document.createElement('a');
    text.className = 'button button-ghost';
    text.href = `sms:${PHONE_TEL}`;
    text.textContent = `Text ${PHONE_DISPLAY}`;

    heroActions.append(call, text);
  }

  const faqContact = document.querySelector('.faq-heading p:last-of-type');
  if (faqContact && !faqContact.textContent.includes(PHONE_DISPLAY)) {
    faqContact.innerHTML = `Still have a question? Call or text <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a>, or email <a href="mailto:info@cleartechgutters.com">info@cleartechgutters.com</a>.`;
  }

  const contactHeading = [...document.querySelectorAll('.site-footer h3')].find((h) => h.textContent.trim() === 'Contact');
  const contactColumn = contactHeading?.parentElement;
  if (contactColumn && !contactColumn.querySelector('a[href^="tel:"]')) {
    const firstLink = contactColumn.querySelector('a');
    const call = document.createElement('a');
    call.href = `tel:${PHONE_TEL}`;
    call.textContent = `Call ${PHONE_DISPLAY}`;
    const text = document.createElement('a');
    text.href = `sms:${PHONE_TEL}`;
    text.textContent = `Text ${PHONE_DISPLAY}`;
    contactColumn.insertBefore(text, firstLink || null);
    contactColumn.insertBefore(call, text);
  }

  const exploreHeading = [...document.querySelectorAll('.site-footer h3')].find((h) => h.textContent.trim() === 'Explore');
  const exploreColumn = exploreHeading?.parentElement;
  if (exploreColumn && !exploreColumn.querySelector('a[href*="service-areas.html"]')) {
    const areaLink = document.createElement('a');
    areaLink.href = onHomepage ? 'service-areas.html' : '/service-areas.html';
    areaLink.textContent = 'Service areas';
    exploreColumn.appendChild(areaLink);
  }

  const textCapableDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  document.querySelectorAll(`a[href="sms:${PHONE_TEL}"]`).forEach((link) => {
    if (textCapableDevice) return;
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(PHONE_DISPLAY);
        window.alert(`Text ${PHONE_DISPLAY} from your phone. The number has been copied.`);
      } catch (_) {
        window.prompt('Text this number from your phone:', PHONE_DISPLAY);
      }
    });
  });

  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd.textContent);
      data.telephone = '+1-412-228-0405';
      data.priceRange = '$99-$149';
      if (onHomepage) {
        data.description = 'Ground-based gutter cleaning for suitable homes in Pittsburgh and nearby communities.';
        data.areaServed = [
          { '@type': 'City', name: 'Pittsburgh', addressRegion: 'PA' },
          { '@type': 'City', name: 'Sharpsburg', addressRegion: 'PA' },
          { '@type': 'City', name: 'Aspinwall', addressRegion: 'PA' },
          { '@type': 'AdministrativeArea', name: "O'Hara Township", addressRegion: 'PA' },
          { '@type': 'City', name: 'Fox Chapel', addressRegion: 'PA' }
        ];
      }
      jsonLd.textContent = JSON.stringify(data);
    } catch (_) {}
  }

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

  const form = document.querySelector('#quote-form');
  const status = document.querySelector('#form-status');

  const showStatus = (message, type) => {
    if (!status) return;
    status.textContent = message;
    status.className = `form-status show ${type}`;
  };

  if (form) {
    form.querySelector('[name="home_height"]')?.closest('label')?.remove();
    form.querySelector('#upload-box')?.remove();
    form.querySelector('#file-preview')?.remove();
    form.querySelector('[name="photos"]')?.remove();

    // Use a normal browser POST rather than AJAX. This is more reliable and
    // allows FormSubmit's one-time email activation flow to work visibly.
    form.action = 'https://formsubmit.co/info@cleartechgutters.com';
    form.method = 'POST';
    form.removeAttribute('novalidate');

    const hiddenFields = {
      _template: 'table',
      _subject: 'New ClearTech Gutters quote request',
      _captcha: 'false',
      _next: 'https://cleartechgutters.com/?quote=sent#quote'
    };

    Object.entries(hiddenFields).forEach(([name, value]) => {
      let input = form.querySelector(`input[name="${name}"]`);
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        form.prepend(input);
      }
      input.value = value;
    });

    form.querySelector('[name="service_interest"]')?.closest('label')?.remove();
    form.querySelector('input[name="service_interest"]')?.remove();

    const detailsLabel = form.querySelector('textarea[name="details"]')?.closest('label');
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Which category looks closest to your home?';
    const category = document.createElement('select');
    category.name = 'service_interest';
    category.id = 'service-interest';
    category.required = true;
    [
      ['', 'Select one'],
      ['Simple gutters — $99', 'Simple gutters — $99'],
      ['Most 2-story homes — $129', 'Most 2-story homes — $129'],
      ['Large / complex — $149', 'Large / complex — $149'],
      ['Not sure — review my address', 'Not sure — review my address']
    ].forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      category.appendChild(option);
    });
    categoryLabel.appendChild(category);
    if (detailsLabel) form.insertBefore(categoryLabel, detailsLabel);
    else form.appendChild(categoryLabel);

    form.addEventListener('submit', (event) => {
      if (form.company_website?.value) {
        event.preventDefault();
        return;
      }
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        showStatus('Please complete the required fields before sending your request.', 'error');
      }
    });
  }

  if (new URLSearchParams(location.search).get('quote') === 'sent') {
    showStatus('Thank you. Your quote request was sent successfully.', 'success');
    history.replaceState({}, '', `${location.pathname}#quote`);
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
