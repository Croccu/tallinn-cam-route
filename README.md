# Tallinn Cam Route

A work-in-progress app for checking traffic cameras along a route through Tallinn, built with Next.js, React, TypeScript, Tailwind CSS, and Mapbox GL JS.

## Current functionality

- Interactive street map centered on Tallinn, with zoom and rotation controls.
- Responsive map resizing and messages for missing configuration or map-loading errors.
- Start and destination inputs with a swap button.

Route geocoding, route calculation, and camera lookup are not implemented yet. Submitting the form does not calculate a route, and the camera list currently shows an empty-state placeholder.

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

Restart the development server after changing `.env.local`. Without a token, the page still renders but displays a configuration message instead of a map. Loading map tiles requires a network connection and a valid token.

## Validation

There is currently no automated test suite or `npm test` script. Run the available static and build checks:

```bash
npm run lint
npm run build
npx --no-install tsc --noEmit
```

Run the build before the standalone type check on a fresh checkout so Next.js can generate its route types. The build also checks TypeScript. The app uses Google-hosted Geist fonts through `next/font`, so the build may need network access to download them.

For a manual smoke check, open the app and verify that the map is centered on Tallinn, navigation controls work, and resizing the window keeps the map fitted to its panel. With the token unset and the server restarted, verify that the configuration message appears.

## Production

Set `NEXT_PUBLIC_MAPBOX_TOKEN` in the build environment, then run:

```bash
npm run build
npm start
```

Public environment variables are embedded at build time; changing the token for a production deployment requires rebuilding the app.

## Project structure

- `src/app/page.tsx`: Main page layout.
- `src/components/map.tsx`: Mapbox map, controls, resizing, and error messages.
- `src/components/route-form.tsx`: Start and destination form.
- `src/components/camera-list.tsx`: Camera-list empty state.
