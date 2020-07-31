import React, { ChangeEvent } from "react";
import { Searchbar } from "../Searchbar";
import { SearchResultList } from "./SearchResultList";
import { Course } from "../../model/Course";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import { FuseSearch } from "../FuseSearch";

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

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      query: event.target.value,
    });
  }

  render() {
    const { courses } = this.props;
    const { query } = this.state;

    const resultList = (
      <FuseSearch
        query={query}
        items={courses}
        options={this.getFuseOptions()}
        render={(items) => {
          return <SearchResultList results={items} {...this.props} />;
        }}
      />
    );

    return (
      <React.Fragment>
        <Hero title="Course Search" color={Color.TEAL} />
        <Container>
          <Searchbar onUpdate={this.onFilter.bind(this)} />
          {resultList}
        </Container>
      </React.Fragment>
    );
  }
}
