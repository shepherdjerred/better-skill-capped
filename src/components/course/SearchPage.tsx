import React from "react";
import { SearchResultList } from "./SearchResultList";
import { Course } from "../../model/Course";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import Search from "../search/Search";

export interface CourseSearchPageProps {
  courses: Course[];
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
}

export function CourseSearchPage(props: CourseSearchPageProps) {
  const fuseOptions = {
    keys: ["title", "description", "videos.video.title", "videos.video.altTitle"],
    minMatchCharLength: 2,
    threshold: 0.3,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    includeScore: true,
  };

  const { courses } = props;

  return (
    <React.Fragment>
      <Hero title="Course Search" color={Color.TEAL} />
      <Container>
        <Search
          items={courses}
          fuseOptions={fuseOptions}
          render={(items) => <SearchResultList results={items} {...props} />}
          itemsPerPage={10}
          searchBarPlaceholder="Search Courses"
        />
      </Container>
    </React.Fragment>
  );
}
