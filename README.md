# ClearTech Gutters website

A responsive, single-page lead-generation site built for GitHub Pages.

## Files

- `index.html` — page content and SEO metadata
- `styles.css` — complete responsive design
- `script.js` — menu, FAQ, animations, photo previews, and form submission
- `404.html` — custom not-found page
- `CNAME` — preserves `cleartechgutters.com` on GitHub Pages
- `robots.txt` and `sitemap.xml` — basic search-engine setup
- `assets/` — favicon and social sharing card

## Connect the quote form

The form is already designed and coded. It needs a Formspree form ID before it can send submissions.

1. Create a Formspree account and a new form.
2. Copy the endpoint, which looks like:
   `https://formspree.io/f/abcdwxyz`
3. Open `index.html`.
4. Find:
   `https://formspree.io/f/REPLACE_WITH_FORM_ID`
5. Replace it with your real endpoint.

The form is configured as `multipart/form-data` so image uploads can be submitted when the Formspree plan supports file uploads.

## Add Google Analytics

Paste the Google tag immediately before `</head>` in `index.html`. Use the measurement ID for the ClearTech Gutters property, not the Savory Tastes property.

## Publish to the existing GitHub Pages repository

1. Back up the current repository.
2. Upload all files from this folder to the repository root.
3. Commit the changes.
4. In GitHub: **Settings → Pages**.
5. Confirm deployment is from the correct branch and root folder.
6. Keep the included `CNAME` file.

## Recommended content replacements

Before advertising the site:

- Add the exact service ZIP codes or communities.
- Add a business phone number, if desired.
- Replace the illustrated before/after section with authentic job photos after the first few jobs.
- Confirm what the standard and complex services include.
- Add insurance or licensing language only if it is accurate and documented.

## Local preview

From this directory, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.
