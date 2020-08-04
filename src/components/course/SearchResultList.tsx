import React from "react";
import { CourseSearchResult } from "./SearchResult";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import { FuseSearchResult } from "../FuseSearch";
import { Course } from "../../model/Course";

export interface CoursesListProps {
  results: FuseSearchResult<Course>[];
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
}

export function SearchResultList(props: CoursesListProps) {
  const { isBookmarked, isWatched } = props;

  const courses = props.results.map((result) => (
    <CourseSearchResult
      result={result}
      key={result.item.uuid}
      onToggleBookmark={props.onToggleBookmark}
      isBookmarked={isBookmarked}
      onToggleWatchStatus={props.onToggleWatchStatus}
      isWatched={(item) => isWatched(item)}
    />
  ));
  return <React.Fragment>{courses}</React.Fragment>;
}
