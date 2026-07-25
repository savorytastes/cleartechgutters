# ClearTech Gutters website

Static GitHub Pages site for **cleartechgutters.com**.

## Publish the revised site

1. Open the `savorytastes/cleartechgutters` repository on GitHub.
2. Delete the old website files from the repository root, but keep the repository itself.
3. Upload the contents of this folder—not the enclosing folder.
4. Commit the upload to the `main` branch.
5. Open **Actions** or **Settings → Pages** and wait for the deployment to finish.
6. Refresh `https://cleartechgutters.com/` with Ctrl+F5.

The root should contain `index.html`, `styles.css`, `script.js`, `CNAME`, `.nojekyll`, and the `assets` folder.

## Important: connect the quote form

The site currently contains a placeholder Formspree action:

```html
action="https://formspree.io/f/REPLACE_WITH_FORM_ID"
```

Create or open the Formspree form that should receive quote requests. Replace `REPLACE_WITH_FORM_ID` in `index.html` with the actual Formspree form ID before publishing.

Example:

```html
action="https://formspree.io/f/abcdwxyz"
```

Then submit a test request from the live website and confirm that it arrives at `info@cleartechgutters.com`.

## Pricing and quote flow

- Fixed prices: **$99, $129, and $149**
- Every tier includes the same complete cleaning standard.
- Customers provide their address and contact information.
- ClearTech reviews the property online and confirms the applicable guaranteed price before booking.
