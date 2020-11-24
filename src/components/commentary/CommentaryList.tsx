import React from "react";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import Search from "../search/Search";
import { Commentary } from "../../model/Commentary";
import { VideoSearchResult } from "../video/SearchResult";

export interface CommentaryListProps {
  commentaries: Commentary[];
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export default function CommentaryList(props: CommentaryListProps) {
  const fuseOptions = {
    keys: ["video.title", "video.description", "video.alternateTitle"],
    minMatchCharLength: 2,
    threshold: 0.3,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    includeScore: true,
  };

  const { commentaries, isWatched, isBookmarked, onToggleBookmark, onToggleWatchStatus } = props;

  return (
    <React.Fragment>
      <Hero title="Commentaries" color={Color.TEAL} />
      <Container>
        <Search
          items={commentaries}
          fuseOptions={fuseOptions}
          render={(item) => (
            <VideoSearchResult
              key={item.item.video.uuid}
              video={item.item.video}
              isBookmarked={isBookmarked(item.item.video)}
              isWatched={isWatched(item.item.video)}
              onToggleBookmark={onToggleBookmark}
              onToggleWatchStatus={onToggleWatchStatus}
              matchedStrings={item.matchedStrings}
            />
          )}
          itemsPerPage={20}
          searchBarPlaceholder="Search Videos"
        />
      </Container>
    </React.Fragment>
  );
}
