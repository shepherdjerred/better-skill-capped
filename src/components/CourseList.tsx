import React from "react";
import {Course} from "../model/Course";
import CourseComponent from "./CourseComponent";

export interface CoursesListProps {
  courses: Course[];
}

export class CourseList extends React.Component<CoursesListProps, any> {
  renderCourses() {
    return this.props.courses.map((course) => {
      return (
          <div key={course.uuid}>
            <CourseComponent course={course}/>
          </div>
      );
    });
  }

  render() {
    return (
        <React.Fragment>
          {this.renderCourses()}
        </React.Fragment>
    );
  }
}
