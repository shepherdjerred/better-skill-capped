import React from "react";
import { Bookmark } from "../../model/Bookmark";
import { CourseSearchResultComponent } from "../course/CourseSearchResultComponent";
import { Course } from "../../model/Course";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { WatchStatus } from "../../model/WatchStatus";

export interface BookmarkListProps {
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
  watchStatuses: WatchStatus[];
  onToggleWatchStatus: (course: Course) => void;
}

function isWatched(course: Course, watchStatuses: WatchStatus[]) {
  return (
    watchStatuses.find((watchStatuses) => {
      return watchStatuses.item.uuid === course.uuid;
    }) !== undefined
  );
}

export function BookmarkList(props: BookmarkListProps) {
  const bookmarks = props.bookmarks.map((bookmark) => {
    const result = {
      course: bookmark.item as Course,
      matches: [],
    };

    return (
      <CourseSearchResultComponent
        result={result}
        onToggleBookmark={() => props.onToggleBookmark(result.course)}
        isBookmarked={true}
        key={result.course.uuid}
        onToggleWatchStatus={() => props.onToggleWatchStatus(result.course)}
        isWatched={isWatched(result.course, props.watchStatuses)}
      />
    );
  });

  return (
    <React.Fragment>
      <Hero title="Bookmarks" color={Color.TEAL} />
      <Container>
        <div>{bookmarks}</div>
      </Container>
    </React.Fragment>
  );
}
