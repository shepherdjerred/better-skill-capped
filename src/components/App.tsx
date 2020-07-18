import React from "react";
import data from "../data/dump.json";
import {Parser} from "../parser/Parser";
import {Content} from "../model/Content";
import {Footer} from "./Footer";
import {Navbar} from "./Navbar";
import {CourseHome} from "./course/CourseHome";

export interface AppState {
  data: Content;
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    const parser = new Parser();
    const content = parser.parse(JSON.stringify(data));

    console.log(content);

    this.state = {
      data: content,
    };
  }

  render() {
    return (
        <React.Fragment>
          <Navbar/>
          <CourseHome courses={this.state.data.courses}/>
          <Footer/>
        </React.Fragment>
    );
  }
}
