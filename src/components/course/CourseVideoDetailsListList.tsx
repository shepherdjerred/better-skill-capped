import React from "react";
import { Course } from "../../model/Course";
import CourseVideoComponent from "./CourseVideoDetailsList";

export interface CourseVideoDetailsListListProps {
  courses: Course[];
}

export class CourseVideoDetailsListList extends React.PureComponent<CourseVideoDetailsListListProps, unknown> {
  renderCourses() {
    return this.props.courses.map((course) => {
      return (
        <div key={course.uuid}>
          <CourseVideoComponent course={course} />
        </div>
      );
    });
  }

  render() {
    return <React.Fragment>{this.renderCourses()}</React.Fragment>;
  }
}
