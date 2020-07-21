import React from "react";
import { CourseSearchResult, CourseSearchResultComponent } from "./CourseSearchResultComponent";
import { Bookmark } from "../../model/Bookmark";
import { Course } from "../../model/Course";

export interface CoursesListProps {
  results: CourseSearchResult[];
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
}

function isBookmarked(course: Course, bookmarks: Bookmark[]) {
  return (
    bookmarks.find((bookmark) => {
      return "uuid" in bookmark.item && bookmark.item.uuid === course.uuid;
    }) !== undefined
  );
}

export function CourseSearchResultList(props: CoursesListProps) {
  const courses = props.results.map((result) => (
    <CourseSearchResultComponent
      result={result}
      key={result.course.uuid}
      onToggleBookmark={() => props.onToggleBookmark(result.course)}
      isBookmarked={isBookmarked(result.course, props.bookmarks)}
    />
  ));
  return <React.Fragment>{courses}</React.Fragment>;
}
