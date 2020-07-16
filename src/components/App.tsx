import React, {ChangeEvent} from "react";
import data from "../data/dump.json";
import {Parser} from "../parser/Parser";
import {Content} from "../model/Content";
import {Container} from "./Container";
import {CourseList} from "./CourseList";
import {Hero} from "./Hero";
import {FilterBar} from "./FilterBar";
import {Course} from "../model/Course";
import Fuse from "fuse.js";

export interface AppState {
  data: Content;
  search: string;
  fuse: Fuse<Course, Fuse.IFuseOptions<Course>>
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    const parser = new Parser();
    const content = parser.parse(JSON.stringify(data));

    console.log(content);

    const options = {
      keys: [
        "title",
        "description",
        "videos.video.title",
        "videos.video.description"
      ]
    }

    const index = Fuse.createIndex(options.keys, content.courses)

    this.state = {
      data: content,
      fuse: new Fuse<Course, Fuse.IFuseOptions<Course>>(content.courses, options, index),
      search: ""
    };
  }

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      search: event.target.value || ""
    })
  }

  findCourses(): Course[] {
    const allCourses = this.state.data.courses;
    const query = this.state.search;
    const fuse = this.state.fuse;

    if (query === "") {
      return allCourses;
    } else {
      return fuse.search(query).map((result) => result.item);
    }
  }

  render() {
    const courses = this.findCourses();

    return (
        <React.Fragment>
          <Hero title="Courses" subtitle=""/>
          <Container>
            <FilterBar onUpdate={this.onFilter.bind(this)}/>
            <CourseList courses={courses}/>
          </Container>
        </React.Fragment>
    );
  }
}
