# Warsaw Windows & Preservation — coming-soon page

A single static page for **warsawwp.com** while the full website is built. Plain HTML and CSS plus one small vanilla JavaScript file (`script.js`, for copying the email address): no framework, no npm, no build step, no third-party requests (the two typefaces are self-hosted).

```
warsaw-coming-soon/
├── index.html          the page (copy, metadata, optional contact button)
├── styles.css          all styling
├── script.js           copies the email address when a visitor clicks Contact us or the copy icon
├── _headers            Cloudflare Pages security and cache headers
├── .gitignore
├── README.md
└── assets/
    ├── logo.png        the approved logo (PNG fallback)
    ├── logo.webp       the same logo, smaller file
    ├── favicon.ico, favicon-32.png, icon-192.png, apple-touch-icon.png
    ├── og-image.png    preview image for link sharing (1200×630)
    └── fonts/          Playfair Display + Inter, with their full SIL Open Font License texts
```

## Deploy on Cloudflare Pages (from GitHub)

1. Create the **private** GitHub repository `warsaw-coming-soon`, then upload the contents of this folder so that `index.html` sits at the **root** of the repository (not inside a subfolder). Make sure the `assets` folder and the `_headers` file come across; if you upload through the GitHub website, check they appear in the file list.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, authorise GitHub, and pick `warsaw-coming-soon`.
3. Build settings:
   - Framework preset: **None**
   - Build command: **leave empty**
   - Build output directory: **`/`** (or leave empty)
4. Select **Save and Deploy**. The site goes live at `<project>.pages.dev` in under a minute. Open it and check the logo and fonts load.
5. To use the real domain: project → **Custom domains → Set up a custom domain → `warsawwp.com`** and follow Cloudflare's DNS prompt. Add `www.warsawwp.com` the same way if you want it to work too.

Every push to the production branch (usually `main`) redeploys automatically. Pushes to other branches get their own preview URLs.

## What you need to fill in

| Item | Status | What to do |
|---|---|---|
| **Contact email** | Live. "Contact us" opens Gmail's compose window (new tab) addressed to `Bart@warsawwp.com` and copies the address. The address is also shown under the button with a copy icon, and a "Use another email app" link opens the visitor's default mail app. | To change the address, edit it in **three places** in `index.html` (the Gmail link `to=` value, the visible text, the `mailto:` link) and in `EMAIL` at the top of `script.js`. |
| **Company name** | "Warsaw Windows & Preservation", matching the logo, in the page title, metadata, structured data, logo description and footer | Nothing to do. |
| **Logo** | The approved skyline logo, exactly as supplied | To replace it, overwrite `assets/logo.png` and `assets/logo.webp` (same width and shape, or update `width`/`height` in `index.html`). |
| **Favicon** | Made from the clock tower in the logo. A working default that **needs the client's approval** | To change it, replace `favicon.ico`, `favicon-32.png`, `icon-192.png` and `apple-touch-icon.png`. |
| **Share image** | `assets/og-image.png` is the logo on ivory | Replace it if you want something different in link previews. |
| **Copyright year** | 2026, typed into the footer | Update in `index.html` when the year changes. |

## Search engines: the page is set to noindex

The page asks Google and other search engines not to list it, in two ways: `<meta name="robots" content="noindex">` in `index.html` and an `X-Robots-Tag: noindex` header in `_headers`. **When the full website launches, remove both**, otherwise the new site will stay out of search results. Do not add a `robots.txt` that blocks the site: search engines must be able to read the page to see the noindex instruction. Noindex works over time as search engines revisit the page; it is not instant.

## Notes

- Colours: ivory `#F5F2EB`, charcoal `#24231F`, bronze `#9C8060` (rules), a darker bronze `#6A533C` for text, olive `#343D30` (button). Edit them at the top of `styles.css`.
- Accessibility: one `h1`, landmarks (`main`, `footer`), skip link, visible keyboard focus, keyboard-operable copy button (Enter and Space), the "Email copied!" message announced to screen readers, text contrast at WCAG AA, decorative graphics hidden from screen readers.
- Security headers (`_headers`): a strict Content-Security-Policy. Only the site's own images, fonts, stylesheet and `script.js` are allowed; there are no inline scripts or styles and no outside requests. The JSON-LD structured data is a data block, not a running script, so it is unaffected. Opening Gmail in a new tab is a normal link, which the policy does not restrict. If you later add analytics or other outside scripts, the policy needs updating.
- **Contact button behaviour:** it is a plain link to Gmail (`target="_blank"`), so the browser opens the tab straight from the click and popup blockers do not interfere; it works even if JavaScript is off. `script.js` copies the address in the same click and never blocks the link: if the browser refuses clipboard access, Gmail still opens and no "Email copied!" message is shown.
- **Limits to know about:** the link opens Gmail's *web* page, so visitors may have to sign in, and it cannot force the Gmail phone app to open. That is why the copy icon and the "Use another email app" link are there. Browsers on iPhone and some others can refuse automatic copying; the copy icon is the dependable route.
- **Email obfuscation:** the contact block is wrapped in `<!--email_off-->` comments so Cloudflare's Email Address Obfuscation cannot replace the address with "[email protected]". If you ever see that, check Cloudflare → Scrape Shield → Email Address Obfuscation and switch it off for the site.
- Fonts: the full SIL Open Font License texts and copyright notices are in `assets/fonts/` (`OFL-Playfair-Display.txt`, `OFL-Inter.txt`, summarised in `LICENSE.md`). Keep them in the project.
- Locally: opening `index.html` by double-click will not load the images (paths start with `/`). To preview, run `python3 -m http.server` inside this folder and visit `http://localhost:8000`.
