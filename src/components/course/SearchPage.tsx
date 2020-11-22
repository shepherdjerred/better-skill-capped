import React from "react";
import { Searchbar } from "../Searchbar";
import { SearchResultList } from "./SearchResultList";
import { Course } from "../../model/Course";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import PaginatedFuseSearch from "../search/PaginatedFuseSearch";

export interface CourseSearchPageProps {
  courses: Course[];
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
}

export interface CourseSearchPageState {
  query: string;
}

export class CourseSearchPage extends React.PureComponent<CourseSearchPageProps, CourseSearchPageState> {
  constructor(props: Readonly<CourseSearchPageProps>) {
    super(props);

    this.state = {
      query: "",
    };
  }

  getFuseOptions() {
    return {
      keys: ["title", "description", "videos.video.title", "videos.video.altTitle"],
      minMatchCharLength: 2,
      threshold: 0.3,
      useExtendedSearch: true,
      includeMatches: true,
      ignoreLocation: true,
      includeScore: true,
    };
  }

  onQueryUpdate(newValue: string) {
    this.setState((state) => {
      return {
        ...state,
        query: newValue,
        page: 1,
      };
    });
  }

  render() {
    const { courses } = this.props;
    const { query } = this.state;

    return (
      <React.Fragment>
        <Hero title="Course Search" color={Color.TEAL} />
        <Container>
          <Searchbar onValueUpdate={this.onQueryUpdate.bind(this)} placeholder="Search courses" />
          <PaginatedFuseSearch
            query={query}
            items={courses}
            fuseOptions={this.getFuseOptions()}
            render={(items) => <SearchResultList results={items} {...this.props} />}
            itemsPerPage={10}
          />
        </Container>
      </React.Fragment>
    );
  }
}
