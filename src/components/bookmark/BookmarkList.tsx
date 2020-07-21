import React from "react";
import { Bookmark } from "../../model/Bookmark";
import { CourseSearchResultComponent } from "../course/CourseSearchResultComponent";
import { Course } from "../../model/Course";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";

export interface BookmarkListProps {
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
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
      />
    );
  });

  return (
    <React.Fragment>
      <Hero title="Course Search" color={Color.TEAL} />
      <Container>
        <div>{bookmarks}</div>
      </Container>
    </React.Fragment>
  );
}
