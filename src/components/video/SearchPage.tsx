import { Video } from "../../model/Video";
import React from "react";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { VideoSearchResult } from "./SearchResult";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import Search from "../search/Search";

export interface VideoSearchPageProps {
  videos: Video[];
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export default function VideoSearchPage(props: VideoSearchPageProps) {
  const fuseOptions = {
    keys: ["title", "description", "alternateTitle"],
    minMatchCharLength: 2,
    threshold: 0.3,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    includeScore: true,
  };

  const { videos, isWatched, isBookmarked, onToggleBookmark, onToggleWatchStatus } = props;

  return (
    <React.Fragment>
      <Hero title="Video Search" color={Color.TEAL} />
      <Container>
        <Search
          items={videos}
          fuseOptions={fuseOptions}
          render={(items) =>
            items.map((item) => (
              <VideoSearchResult
                key={item.item.uuid}
                video={item.item}
                isBookmarked={isBookmarked(item.item)}
                isWatched={isWatched(item.item)}
                onToggleBookmark={onToggleBookmark}
                onToggleWatchStatus={onToggleWatchStatus}
              />
            ))
          }
          itemsPerPage={20}
          searchBarPlaceholder="Search Videos"
        />
      </Container>
    </React.Fragment>
  );
}
