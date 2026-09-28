# OrgTik frontend

React + Vite implementation of the supplied **OrgTik Website3.html** reference. See the [repository README](../README.md) for routes and scope.

## Development

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

## Verification

```sh
npm run format:check
npm run build
```

Output: `dist/client`. Configure an SPA fallback for every page path.

## Editing

The ten page components in `src/reference` contain each page's content, presentation, and interaction state. `site.css` contains global accessibility and typography rules; `states.css` preserves the reference's hover treatments. Navigation lives in `src/reference/navigation.js` and `src/App.jsx`. Assets use root-relative URLs and local fonts, so nested routes do not depend on third-party CDNs.

The import utility converts the supplied export into regular React source. It is a migration tool, not a build step. Do not rerun it over subsequent manual changes without reviewing the diff. The bundled document runtime and editable image-upload widget are not shipped. `image-slot.js` is a display-only image element preserving the reference's image framing and logo mirrors.

Previous source remains available in Git history. Planning documents outside this folder describe earlier iterations and are not the current visual specification.

## Browser verification

`tools/verify.cjs`, `tools/interactions.cjs`, and `tools/capture.cjs` use Playwright and connect to a local browser debugging endpoint at port 9222. Set `PLAYWRIGHT_MODULE_PATH` to the available Playwright package when it is provided by the workspace runtime. These are development checks, not production dependencies. See `design-qa.md` for the actual coverage and build status.
