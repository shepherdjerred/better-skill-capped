import React from "react";
import data from "../data/dump.json";
import { Parser } from "../parser/Parser";
import { Content } from "../model/Content";
import { ErrorBoundary, ErrorPageType } from "./ErrorBoundary";
import { Router } from "./Router";

export interface AppState {
  content: Content;
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    const parser = new Parser();
    const content = parser.parse(JSON.stringify(data));

    console.log(content);

    this.state = {
      content: content,
    };
  }

  render() {
    return (
      <React.Fragment>
        <ErrorBoundary type={ErrorPageType.FULL}>
          <Router courses={this.state.content.courses} />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
