import React from "react";
import data from "./data/dump.json"
import {Parser} from "./parser/Parser";
import {Content} from "./model/Content";
import VideoComponent from "./VideoComponent";
import CourseComponent from "./CourseComponent";

export interface AppState {
  data: Content;
}

export default class App extends React.Component<unknown, AppState> {

  constructor(props: unknown) {
    super(props);

    const parser = new Parser();

    this.state = {
      data: parser.parse(JSON.stringify(data))
    };

    console.log(this.state.data);
  }

  render() {
    const courses = this.state.data.courses.map((course) => {
      return (
          <div key={course.uuid}>
            <CourseComponent course={course}/>
          </div>
      )
    });

    return (
        <div>
          <h1>Courses</h1>
          {courses}
        </div>
    );
  }
}
