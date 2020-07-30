import React from "react";
import { CourseSearchResult, CourseSearchResultComponent } from "./CourseSearchResultComponent";
import { Bookmark } from "../../model/Bookmark";
import { Course } from "../../model/Course";
import { WatchStatus } from "../../model/WatchStatus";
import {Video} from "../../model/Video";

export interface CoursesListProps {
  results: CourseSearchResult[];
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
  watchStatuses: WatchStatus[];
  onToggleWatchStatus: (course: Course | Video) => void;
}

function isBookmarked(course: Course, bookmarks: Bookmark[]) {
  return (
    bookmarks.find((bookmark) => {
      return bookmark.item.uuid === course.uuid;
    }) !== undefined
  );
}

function isWatched(item: Course | Video, watchStatuses: WatchStatus[]) {
  return (
    watchStatuses.find((watchStatuses) => {
      return watchStatuses.item.uuid === item.uuid && watchStatuses.isWatched;
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
      onToggleWatchStatus={props.onToggleWatchStatus}
      isWatched={(item) => isWatched(item, props.watchStatuses)}
    />
  ));
  return <React.Fragment>{courses}</React.Fragment>;
}
