(() => {
  const STORAGE_KEY = 'cleartech_lead_source_v1';

  const getReferrerDomain = () => {
    if (!document.referrer) return '';
    try {
      return new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, '');
    } catch (_) {
      return '';
    }
  };

  const classifySource = ({ referrerDomain, utmSource, utmMedium }) => {
    if (utmSource) return utmMedium ? `${utmSource} / ${utmMedium}` : utmSource;
    if (!referrerDomain) return 'Direct / unknown';
    if (referrerDomain.includes('google.')) return 'Google Search';
    if (referrerDomain.includes('bing.com')) return 'Bing Search';
    if (referrerDomain.includes('duckduckgo.com')) return 'DuckDuckGo';
    if (referrerDomain.includes('search.yahoo.com') || referrerDomain === 'yahoo.com') return 'Yahoo Search';
    if (referrerDomain.includes('nextdoor.com')) return 'Nextdoor';
    if (referrerDomain.includes('facebook.com') || referrerDomain.includes('fb.com')) return 'Facebook';
    if (referrerDomain.includes('instagram.com')) return 'Instagram';
    return referrerDomain;
  };

  const params = new URLSearchParams(location.search);
  const campaign = {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || ''
  };

  let tracking = null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    tracking = stored ? JSON.parse(stored) : null;
  } catch (_) {}

  if (!tracking) {
    const referrerDomain = getReferrerDomain();
    tracking = {
      source: classifySource({
        referrerDomain,
        utmSource: campaign.utm_source,
        utmMedium: campaign.utm_medium
      }),
      referrer_domain: referrerDomain || 'None / unavailable',
      landing_page: location.pathname,
      utm_source: campaign.utm_source,
      utm_medium: campaign.utm_medium,
      utm_campaign: campaign.utm_campaign
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tracking));
    } catch (_) {}
  }

  const form = document.querySelector('#quote-form');
  if (!form) return;

  const addHidden = (name, value) => {
    if (!value || form.querySelector(`input[name="${name}"]`)) return;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  addHidden('lead_source', tracking.source);
  addHidden('lead_referrer_domain', tracking.referrer_domain);
  addHidden('lead_landing_page', tracking.landing_page);
  addHidden('utm_source', tracking.utm_source);
  addHidden('utm_medium', tracking.utm_medium);
  addHidden('utm_campaign', tracking.utm_campaign);
})();
