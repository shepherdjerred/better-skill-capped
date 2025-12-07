import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./bulma.sass";
import * as Sentry from "@sentry/react";
import { GA4React } from "ga-4-react";
import { GA4ReactResolveInterface } from "ga-4-react/dist/models/gtagModels";

// Set up dark mode based on system preference
function setupTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
}

// Initial setup
setupTheme();

// Listen for system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setupTheme);

const ga4react = new GA4React("G-JPTQRHF6LZ");
ga4react.initialize().then(
  (ga4: GA4ReactResolveInterface) => {
    ga4.pageview(window.location);
  },
  (err: unknown) => {
    console.error(err);
  },
);

Sentry.init({
  dsn: "https://7822525c2ffb4c61a436c1dfdfa14be8@o92742.ingest.sentry.io/5364733",
  // release: process.env.REACT_APP_TRAVIS_COMMIT,
  // environment: process.env.NODE_ENV,
});

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
