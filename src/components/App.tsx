import React from "react";
import data from "../data/dump.json";
import {Parser} from "../parser/Parser";
import {Content} from "../model/Content";
import {Container} from "./Container";
import {CourseList} from "./CourseList";
import {Hero} from "./Hero";
import {FilterBar} from "./FilterBar";

export interface AppState {
  data: Content;
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    const parser = new Parser();

    this.state = {
      data: parser.parse(JSON.stringify(data)),
    };
  }

  render() {
    return (
        <React.Fragment>
          <Hero title="Courses" subtitle=""/>
          <Container>
            <FilterBar/>
            <CourseList courses={this.state.data.courses}/>
          </Container>
        </React.Fragment>
    );
  }
}
