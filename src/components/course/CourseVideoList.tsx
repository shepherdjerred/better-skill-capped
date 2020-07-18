import React from "react";
import { Course } from "../../model/Course";
import CourseVideoComponent from "./CourseVideoComponent";

export interface CourseVideoListProps {
  courses: Course[];
}

export class CourseVideoList extends React.Component<CourseVideoListProps, any> {
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
