import { Bookmark, Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import React from "react";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { BookmarkList } from "./List";

export interface BookmarkListPageProps {
  bookmarks: Bookmark[];
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function BookmarkListPage(props: BookmarkListPageProps) {
  const bookmarks = BookmarkList(props);

  return (
    <React.Fragment>
      <Hero title="Bookmarks" color={Color.TEAL} />
      <Container>{bookmarks}</Container>
    </React.Fragment>
  );
}
