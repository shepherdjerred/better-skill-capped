import React from "react";
import { Searchbar } from "../Searchbar";
import { SearchResultList } from "./SearchResultList";
import { Course } from "../../model/Course";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import { FuseSearch } from "../FuseSearch";
import PaginationControls from "../PaginationControls";

export interface CourseSearchPageProps {
  courses: Course[];
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
}

export interface CourseSearchPageState {
  query: string;
  page: number;
  matches: Course[];
}

export class CourseSearchPage extends React.PureComponent<CourseSearchPageProps, CourseSearchPageState> {
  constructor(props: Readonly<CourseSearchPageProps>) {
    super(props);

    this.state = {
      query: "",
      page: 1,
      matches: [],
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

    const itemsPagePage = 10;

    const resultList = (
      <FuseSearch
        query={query}
        items={courses}
        options={this.getFuseOptions()}
        render={(items) => {
          return <SearchResultList results={items} {...this.props} />;
        }}
        itemsPerPage={itemsPagePage}
        page={this.state.page}
        onResultsUpdate={(newResults) => {
          this.setState((state) => {
            return {
              ...state,
              matches: newResults,
            };
          });
        }}
      />
    );

    const pages = Math.floor(this.state.matches.length / itemsPagePage) + 1;

    return (
      <React.Fragment>
        <Hero title="Course Search" color={Color.TEAL} />
        <Container>
          <Searchbar onValueUpdate={this.onQueryUpdate.bind(this)} />
          {resultList}
          <PaginationControls
            currentPage={this.state.page}
            lastPage={pages}
            onPageChange={(newPage) => {
              this.setState((state) => {
                return {
                  ...state,
                  page: newPage,
                };
              });
            }}
          />
        </Container>
      </React.Fragment>
    );
  }
}
