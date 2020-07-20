import React from "react";
import {CourseSearchResult, CourseSearchResultComponent} from "./CourseSearchResultComponent";

export interface CoursesListProps {
  results: CourseSearchResult[];
}

export function CourseSearchResultList(props: CoursesListProps) {
  const courses = props.results.map((result) => <CourseSearchResultComponent result={result}
                                                                             key={result.course.uuid}/>);
  return <React.Fragment>{courses}</React.Fragment>;
}
