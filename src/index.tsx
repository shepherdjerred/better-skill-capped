import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./bulma.sass";
import * as Sentry from "@sentry/react";

Sentry.init(
    {
      dsn: "https://7822525c2ffb4c61a436c1dfdfa14be8@o92742.ingest.sentry.io/5364733",
      release: process.env.TRAVIS_COMMIT,
      environment: process.env.NODE_ENV
    }
);

ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.register();
