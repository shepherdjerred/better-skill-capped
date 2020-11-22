import { Video } from "../../model/Video";
import React from "react";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { VideoSearchResult } from "./SearchResult";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import { FuseSearch } from "../FuseSearch";
import { Searchbar } from "../Searchbar";
import PaginationControls from "../PaginationControls";

export interface VideoSearchPageProps {
  videos: Video[];
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

interface VideoSearchPageState {
  query: string;
  page: number;
  matches: Video[];
}

export default class VideoSearchPage extends React.PureComponent<VideoSearchPageProps, VideoSearchPageState> {
  constructor(props: Readonly<VideoSearchPageProps>) {
    super(props);

    this.state = {
      query: "",
      page: 1,
      matches: [],
    };
  }

  getFuseOptions() {
    return {
      keys: ["title", "description", "alternateTitle"],
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
    const { query } = this.state;
    const { videos, isWatched, isBookmarked, onToggleBookmark, onToggleWatchStatus } = this.props;
    const itemsPagePage = 20;

    const resultList = (
      <FuseSearch
        query={query}
        items={videos}
        options={this.getFuseOptions()}
        render={(items) => {
          return items.map((item) => {
            return (
              <VideoSearchResult
                key={item.item.uuid}
                video={item.item}
                isBookmarked={isBookmarked(item.item)}
                isWatched={isWatched(item.item)}
                onToggleBookmark={onToggleBookmark}
                onToggleWatchStatus={onToggleWatchStatus}
              />
            );
          });
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
        <Hero title="Video Search" color={Color.TEAL} />
        <Container>
          <Searchbar onValueUpdate={this.onQueryUpdate.bind(this)} placeholder="Search videos" />
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
