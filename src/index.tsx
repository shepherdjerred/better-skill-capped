import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./bulma.sass";
import * as Sentry from "@sentry/react";
import { GA4React } from "ga-4-react";
import { GA4ReactResolveInterface } from "ga-4-react/dist/models/gtagModels";

const ga4react = new GA4React("G-JPTQRHF6LZ");
ga4react.initialize().then(
  (ga4: GA4ReactResolveInterface) => {
    ga4.pageview(window.location);
  },
  (err) => {
    console.error(err);
  }
);

Sentry.init({
  dsn: "https://7822525c2ffb4c61a436c1dfdfa14be8@o92742.ingest.sentry.io/5364733",
  release: process.env.REACT_APP_TRAVIS_COMMIT,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
