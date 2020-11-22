import React from "react";
import { Bookmark, Bookmarkable } from "../../model/Bookmark";
import { CourseSearchResult } from "../course/SearchResult";
import { Course } from "../../model/Course";
import { Watchable } from "../../model/WatchStatus";
import { VideoSearchResult } from "../video/SearchResult";
import { Video } from "../../model/Video";

export interface BookmarkListItemProps {
  bookmark: Bookmark;
  matchedStrings: string[];
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

function isCourse(item: Bookmarkable): item is Course {
  return "videos" in item;
}

function isVideo(item: Bookmarkable): item is Video {
  return item !== undefined;
}

export function ListItem({
  bookmark,
  isWatched,
  onToggleWatchStatus,
  onToggleBookmark,
  matchedStrings,
}: BookmarkListItemProps) {
  const item: Bookmarkable = bookmark.item;

  if (isCourse(item)) {
    const result = {
      item,
      matchedStrings: matchedStrings,
    };

    return (
      <CourseSearchResult
        result={result}
        onToggleBookmark={() => onToggleBookmark(item)}
        isBookmarked={() => true}
        key={item.uuid}
        onToggleWatchStatus={onToggleWatchStatus}
        isWatched={(item: Bookmarkable) => isWatched(item)}
      />
    );
  } else if (isVideo(item)) {
    return (
      <VideoSearchResult
        key={item.uuid}
        video={item}
        isBookmarked={true}
        isWatched={isWatched(item)}
        onToggleBookmark={onToggleBookmark}
        onToggleWatchStatus={onToggleWatchStatus}
      />
    );
  }

  return <></>;
}
