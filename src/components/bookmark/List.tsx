import React from "react";
import { Bookmark, Bookmarkable } from "../../model/Bookmark";
import { SearchResult } from "../course/SearchResult";
import { Course } from "../../model/Course";
import { Watchable } from "../../model/WatchStatus";
import { VideoSearchResult } from "../video/SearchResult";
import { Video } from "../../model/Video";

export interface BookmarkListProps {
  bookmarks: Bookmark[];
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function BookmarkList(props: BookmarkListProps) {
  const { isWatched } = props;

  return props.bookmarks.map(({ item }) => {
    const isCourse = "videos" in item;

    if (isCourse) {
      const result = {
        item: item as Course,
        matchedStrings: [],
      };

      return (
        <SearchResult
          result={result}
          onToggleBookmark={() => props.onToggleBookmark(item)}
          isBookmarked={() => true}
          key={item.uuid}
          onToggleWatchStatus={props.onToggleWatchStatus}
          isWatched={(item: Bookmarkable) => isWatched(item)}
        />
      );
    } else {
      const video = item as Video;

      return (
        <VideoSearchResult
          key={video.uuid}
          video={video}
          isBookmarked={true}
          isWatched={props.isWatched(video)}
          onToggleBookmark={props.onToggleBookmark}
          onToggleWatchStatus={props.onToggleWatchStatus}
        />
      );
    }
  });
}
