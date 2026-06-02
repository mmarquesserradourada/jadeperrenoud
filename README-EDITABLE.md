# Editable Static Site (Single Folder)

This folder is both:
- the deployable static site, and
- the editable source for content changes.

## Folder layout

- `index.html` → live mirrored SPA page (keep this as production mirror)
- `assets/` → images and static files (publish this folder)
- `content/*.json` → all editable content
- `templates/index.template.html` → editable page structure/layout
- `scripts/build.mjs` → generator that creates `editable-preview/index.html`
- `editable-preview/index.html` → safe generated preview from JSON content

## Edit content

1. Edit JSON files in `content/`.
2. Run:
   - `npm run build`
3. Run local server:
   - `npm run dev`
4. To preview generated editable version:
   - `npm run preview:editable`

## Commands

```bash
npm run build
npm run dev
npm run preview:editable
```

Live mirror URL: `http://127.0.0.1:8090`
Editable preview URL: `http://127.0.0.1:8091`

## Notes

- Keep image paths in JSON as relative paths, e.g. `assets/jade.png` or `assets/img/local-1.jpeg`.
- You only need to upload this folder content to any static host.
- If you run server from another folder, use absolute path in `--directory` to avoid 404.
