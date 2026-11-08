# AGENTS.md

Tab Pinner is a Manifest V3 Chrome extension. It pins and unpins tabs from a toolbar button and auto-pins tabs whose URL matches user-defined rules. Built with TypeScript, React, Emotion and Vite.

The required Node version is in `.nvmrc`.

## Layout

The Vite root is `src/options`, and the build has two entries:

- `src/background/background.ts`: the service worker. It must build to a stable `build/background.js`, because `static/manifest.json` references that path. See `entryFileNames` in `vite.config.ts`.
- `src/options/options.html`: the options page (React).

`src/shared` is used by both entries, so code there can't assume a DOM. `static/` (manifest, locales, icons) is copied to `build/` as-is.

## Storage

`chrome.storage.sync` holds `{ rules, settings }`. Existing users have data there, so a format change needs a migration path. Every read goes through `getRules` / `RuleBuilder` and `getSettings` / `SettingsBuilder` in `src/shared/getStorageValues/`, which is where stored values get normalized.

## Running it

- `npm run dev`: watch build into `build/`. Load that directory unpacked at `chrome://extensions`.
- `npm run dev:server`: options page only, with hot reload. It isn't connected to an installed extension. `isChromeStorageAvailable` makes storage fall back to `localStorage` and i18n fall back to the English messages.

## Conventions

- **i18n:** add every user-facing string to both `static/_locales/en/messages.json` and `static/_locales/pl/messages.json`. The English file is the source of the `Key` type.
- **Styling:** components keep their styles in a sibling `*.styled.ts` file. Emotion component selectors such as `${Underline}` only work with `@emotion/babel-plugin`, so don't remove it from the Vite config while they're in use.

## Verifying changes

There are no automated tests. Run `npm run type-check`, `npm run lint` and `npm run build`, then load `build/` unpacked and try the affected behaviour.

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

- `new RegExp(rule.regexp)` in `src/background/pinIfMatchesRule.ts` is unguarded, so an invalid pattern throws and the remaining rules aren't evaluated.
- The `localStorage` branch of `storageSet` in `src/options/utils/setStorageValues/setStorageValues.ts` never resolves its promise.
- `src/types/EditMote.ts` has a typo in its filename.
- `SettingKey` still includes an unused `confirm` key.
