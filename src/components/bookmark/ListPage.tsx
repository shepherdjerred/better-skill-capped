import { Bookmark, Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import React from "react";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { ListItem } from "./ListItem";
import Search from "../search/Search";

export interface BookmarkListPageProps {
  bookmarks: Bookmark[];
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function BookmarkListPage({
  bookmarks,
  isWatched,
  onToggleBookmark,
  onToggleWatchStatus,
}: BookmarkListPageProps) {
  const fuseOptions = {
    keys: [
      "item.title",
      "item.description",
      "item.alternateTitle",
      "item.videos.video.title",
      "item.videos.video.altTitle",
    ],
    minMatchCharLength: 2,
    threshold: 0.3,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    includeScore: true,
  };

  return (
    <React.Fragment>
      <Hero title="Bookmarks" color={Color.TEAL} />
      <Container>
        <Search
          items={bookmarks}
          fuseOptions={fuseOptions}
          render={(item) => (
            <ListItem
              bookmark={item.item}
              isWatched={isWatched}
              onToggleBookmark={onToggleBookmark}
              onToggleWatchStatus={onToggleWatchStatus}
              matchedStrings={item.matchedStrings}
            />
          )}
          itemsPerPage={20}
          searchBarPlaceholder="Search Bookmarks"
        />
      </Container>
    </React.Fragment>
  );
}
