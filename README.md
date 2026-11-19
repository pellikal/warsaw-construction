# Warsaw Window Preservation — coming-soon page

A single static page for **warsawwp.com** while the full website is built. Plain HTML and CSS: no framework, no npm, no build step, no JavaScript, no third-party requests (the two typefaces are self-hosted).

```
warsaw-coming-soon/
├── index.html          the page (copy, metadata, optional contact button)
├── styles.css          all styling
├── _headers            Cloudflare Pages security and cache headers
├── .gitignore
├── README.md
└── assets/
    ├── logo.png        the approved logo (PNG fallback)
    ├── logo.webp       the same logo, smaller file
    ├── favicon.ico, favicon-32.png, icon-192.png, apple-touch-icon.png
    ├── og-image.png    preview image for link sharing (1200×630)
    └── fonts/          Playfair Display + Inter (SIL Open Font License; see LICENSE.md)
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
| **Contact email** | Not supplied, so the button is hidden | In `index.html`, find the comment headed `CONTACT BUTTON`. Replace `hello@example.com` with the real address and remove the comment markers around the link. Nothing else changes. |
| **Logo** | The approved skyline logo, exactly as supplied | To replace it, overwrite `assets/logo.png` and `assets/logo.webp` (keep them the same width and shape, or update the `width`/`height` in `index.html`). |
| **Favicon** | Made from the clock tower in the logo. This is a working default and **needs the client's approval** | To change it, replace `favicon.ico`, `favicon-32.png`, `icon-192.png` and `apple-touch-icon.png`. |
| **Share image** | `assets/og-image.png` is the logo on ivory | Replace it if you want something different in link previews. |
| **Copyright year** | 2026, typed into the footer | Update in `index.html` when the year changes. |
| **Company name** | The page text says "Warsaw Window Preservation"; the logo reads "Warsaw Windows & Preservation" | Confirm which is correct and make the text and logo agree. |
| **Search indexing** | The page can be indexed | To keep it out of search results while it is a placeholder, change `content="index, follow"` to `content="noindex"` in `index.html`. |

## Notes

- Colours: ivory `#F5F2EB`, charcoal `#24231F`, bronze `#9C8060` (rules), a darker bronze `#6A533C` for text, olive `#343D30` (button). Edit them at the top of `styles.css`.
- Accessibility: one `h1`, landmarks (`main`, `footer`), skip link, visible keyboard focus, text contrast at WCAG AA, decorative graphics hidden from screen readers.
- The `_headers` file sets a strict Content-Security-Policy. If you later add analytics or other outside scripts, the policy needs updating.
- Locally: opening `index.html` by double-click will not load the images (paths start with `/`). To preview, run `python3 -m http.server` inside this folder and visit `http://localhost:8000`.
