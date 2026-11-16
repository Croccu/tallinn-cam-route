# Tallinn Cam Route

A work-in-progress app for checking traffic cameras along a route through Tallinn, built with Next.js, React, strict TypeScript, colocated CSS, and Mapbox GL JS.

## Current functionality

- Landing page at `/`, with a traffic-photo hero and static Tallinn map preview.
- Route planner at `/plan`, with an interactive map centered on Tallinn, zoom and rotation controls, and responsive resizing.
- Start and destination autocomplete limited to the Tallinn area, with keyboard navigation and a swap button.
- Driving-route calculation, route fitting on the map, distance/duration summaries, and turn-by-turn directions.
- Recoverable messages for missing or invalid configuration and map/directions loading errors.

Select an address suggestion for both endpoints to calculate a route automatically. Camera lookup is not implemented yet; references to camera discovery on the landing page describe the intended product.

## Local setup

Install Node.js compatible with Next.js 16 and npm. Node.js 22 LTS is a suitable choice.

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create `.env.local` in the project root and set a Mapbox public access token:

   ```dotenv
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_access_token
   ```

   Obtain a token from your [Mapbox account](https://account.mapbox.com/access-tokens/). This `NEXT_PUBLIC_` value is included in the browser bundle: use a public token, not a secret token, and configure URL restrictions for your deployment. Local environment files are ignored by Git.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Restart the development server after changing `.env.local`. Configuration is validated centrally in `src/lib/env.ts`: only public Mapbox tokens (`pk.`) are accepted. Missing, malformed, or secret tokens disable map/geocoding requests and display a configuration message. Token validation checks format, not account permissions or expiry. Loading map tiles and directions requires a network connection and an authorized token.

## Validation

There is currently no automated test suite or `npm test` script. Run the available static and build checks:

```bash
npm run lint
npm run build
npx --no-install tsc --noEmit
```

Run the build before the standalone type check on a fresh checkout so Next.js can generate its route types. The build also checks TypeScript. The app uses Google-hosted Geist fonts through `next/font`, so the build may need network access to download them.

For a manual smoke check:
- Open `/` and follow the planner links to `/plan`.
- Verify that the map is centered on Tallinn, navigation controls work, and resizing the window keeps the map fitted to its panel.
- Type at least three characters in each address field. Select suggestions with the mouse and with the arrow/Enter keys; Escape should close the list.
- Select both endpoints and verify the route, duration, distance, and turn-by-turn directions. Swap points, then edit or clear an endpoint and verify the old route is cleared.
- Navigate away and back to check map/control cleanup.
- With the token unset and the server restarted, verify that configuration messages appear instead of maps.

## Production

Set `NEXT_PUBLIC_MAPBOX_TOKEN` in the build environment, then run:

```bash
npm run build
npm start
```

Public environment variables are embedded at build time; changing the token for a production deployment requires rebuilding the app.

## Project structure

- `src/app/`: Thin route entry points, root layout, and global resets/theme/third-party CSS.
- `src/components/<ComponentName>/`: PascalCase UI folders containing `<ComponentName>.tsx`, `<ComponentName>.css`, `<ComponentName>.types.ts`, and a named `index.ts` export. Styles use component-scoped BEM names.
- `src/components/Hero/` and `src/components/MapSection/`: Server-rendered landing-page sections.
- `src/components/PlannerPage/` and `src/components/RoutePlanner/`: Planner shell and interactive endpoint/route state.
- `src/components/AddressInput/`, `src/components/RouteForm/`, `src/components/DirectionsList/`, and `src/components/MapView/`: Planner presentation.
- `src/hooks/useMapbox.ts`: Mapbox/Directions initialization, route updates, resizing, and teardown.
- `src/hooks/useAddressSuggestions.ts`: Debounced, abortable autocomplete requests.
- `src/lib/`: Validated environment configuration, geocoding, map constants, and route geometry/formatting utilities.
- `src/types/`: Shared domain models in camelCase `.types.ts` files and the third-party Directions module declaration.

Follow `AGENTS.md` for architecture and naming rules. TypeScript explicitly enables `strict`, `noImplicitAny`, and `noUncheckedIndexedAccess`.
