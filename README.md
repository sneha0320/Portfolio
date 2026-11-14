# Sneha Balasaheb Mane — Portfolio

A responsive personal portfolio built with **HTML5, CSS3 and Vanilla JavaScript**.

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. For best results, use VS Code Live Server or run a local static server:
   ```bash
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000`.

## Included
- `index.html` — semantic page structure and metadata
- `css/style.css` — responsive visual design
- `js/script.js` — navigation, typing effect, scroll reveals, GitHub API and contact form
- `assets/images/profile.jpg` — supplied profile photograph
- `assets/resume/Sneha_Balasaheb_Mane_Resume.pdf` — supplied résumé

## Integrations
- GitHub public repositories are fetched from the public GitHub REST API at runtime. If the API is unavailable or rate-limited, the page displays a fallback message and a direct profile link.
- LinkedIn is linked directly. The site does not scrape private LinkedIn data.
- The contact form validates input and opens the visitor's configured email application with a prefilled email. It does **not** send mail automatically. To send messages without opening an email client, connect a trusted form backend or email service and configure its credentials securely.
- GSAP and ScrollTrigger are loaded from CDN for scroll reveal animations. The page also has a reduced-motion fallback.

## Before publishing
- Confirm that the displayed contact details are intended to be public.
- Confirm the MCA institution name and start year if you want them displayed.
- Add real project screenshots to `assets/images/` only when available; the current project artwork is CSS illustration, not a screenshot.
- Add actual certificate scans to `assets/certificates/` if you want to show them.
- Check all content and links on mobile and desktop.

## GitHub Pages deployment
1. Create a GitHub repository, for example `sneha0320.github.io` (or any repository for project hosting).
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for the deployment URL shown in the Pages settings.
6. Test the published site, résumé download, profile image and GitHub repository section.

No build step is required.
