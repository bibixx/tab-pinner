# AGENTS.md

Tab Pinner is a Manifest V3 Chrome extension. It pins and unpins tabs from a toolbar button and auto-pins tabs whose URL matches user-defined rules. Built with TypeScript, React, shadcn/ui, Tailwind and Vite.

The required Node version is in `.nvmrc`.

## Layout

The Vite root is `src/options`, and the build has two entries:

- `src/background/background.ts`: the service worker. It must build to a stable `build/background.js`, because `static/manifest.json` references that path. See `entryFileNames` in `vite.config.ts`.
- `src/options/options.html`: the options page (React).

`src/shared` is used by both entries, so code there can't assume a DOM. `static/` (manifest, locales, icons) is copied to `build/` as-is.

## Storage

`chrome.storage.sync` holds `{ rules, settings }`. Existing users have data there, so a format change needs a migration path. Every read goes through `getRules` / `RuleBuilder` and `getSettings` / `SettingsBuilder` in `src/shared/getStorageValues/`, which is where stored values get normalized. For example, rules saved with the old `regexp` field are read as regexp rules.

## Rule matching

`compileRule` in `src/shared/compileRule/` is the only place rules are interpreted, used by both the service worker and the options page validation. A rule is either `regexp` (labelled "Advanced" in the UI) or `simple`. In a simple pattern `*` is the only special character and case is ignored. A bare domain matches only that page with or without `www.`, and `/*` extends it to everything below. Query and hash are ignored unless written. See `compileRule.test.ts` for the exact behaviour.

## Running it

- `npm run dev`: watch build into `build/`. Load that directory unpacked at `chrome://extensions`.
- `npm run dev:server`: options page only, with hot reload. It isn't connected to an installed extension. `isChromeStorageAvailable` makes storage fall back to `localStorage` and i18n fall back to the English messages.

## Conventions

- **i18n:** add every user-facing string to both `static/_locales/en/messages.json` and `static/_locales/pl/messages.json`. The English file is the source of the `Key` type.
- **UI:** the options page uses stock shadcn/ui components with Tailwind v4 and shadcn preset `b6ae1bHgg` (Rhea style, Roboto, lucide icons), with the palette hue changed to the app icon's blue (271) and `--radius` lowered to `0.25rem` in `index.css`. The arrow was also removed from `ui/tooltip.tsx`, the row hover from `ui/table.tsx`, and the default button height in `ui/button.tsx` is 34px. Re-applying the preset or re-adding that component resets these. In-page links use `LinkButton`, which keeps them underlined. `index.css` sets the cursors: arrow by default, pointer on interactive elements, and the browser's caret in inputs. After changing `static/_locales`, reload the extension at `chrome://extensions`; refreshing the page doesn't pick up new strings. Add components with `npx shadcn@latest add <name>` and leave `src/options/components/ui/` as generated (it's excluded from ESLint). Keep Tailwind classes in app code to layout and spacing. `main.tsx` sets the `.dark` class from the system setting.

## Verifying changes

Run `npm test`, `npm run type-check`, `npm run lint` and `npm run build`. Tests only cover rule matching and storage migration, so for anything else load `build/` unpacked and try the affected behaviour.

## Dependency ceilings

- `eslint` stays on 9 until `eslint-plugin-react` and `eslint-plugin-jsx-a11y` accept 10.
- `typescript` stays on 6.0 until `typescript-eslint` accepts newer versions.

## Commits and releases

Commits must follow Conventional Commits (commitlint runs in a husky `commit-msg` hook and in CI).

Releases are manual:

1. Bump `version` in `static/manifest.json`. The store rejects a version that isn't higher than the published one.
2. Run `npm run package` to create `tab-pinner.zip`.
3. Upload the zip in the Chrome Web Store Developer Dashboard.

## Known quirks

- The `localStorage` branch of `storageSet` in `src/options/utils/setStorageValues/setStorageValues.ts` never resolves its promise.
- `SettingKey` still includes an unused `confirm` key.
