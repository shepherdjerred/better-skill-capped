import React from "react";
import { CourseSearchResult, CourseSearchResultComponent } from "./CourseSearchResultComponent";

export interface CoursesListProps {
  results: CourseSearchResult[];
}

export class CourseSearchResultList extends React.PureComponent<CoursesListProps, unknown> {
  renderCourses() {
    return this.props.results.map((result) => <CourseSearchResultComponent result={result} key={result.course.uuid} />);
  }

  render() {
    return <React.Fragment>{this.renderCourses()}</React.Fragment>;
  }
}
