import React from "react";
import { Parser } from "../parser/Parser";
import { Content } from "../model/Content";
import { ErrorBoundary, ErrorPageType } from "./ErrorBoundary";
import { Router } from "./Router";
import axios from 'axios';

export interface AppState {
  content?: Content;
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      content: undefined
    };
  }

  async componentDidMount() {
    const parser = new Parser();
    const contentJson = await axios.get("/skill-capped-manifest.json")
    const content = parser.parse(JSON.stringify(contentJson.data));
    this.setState({
      content
    });
  }

  render() {
    const courses = this.state.content?.courses || [];

    return (
      <React.Fragment>
        <ErrorBoundary type={ErrorPageType.FULL}>
          <Router courses={courses} />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
