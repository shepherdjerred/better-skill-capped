import React from "react";
import { Bookmarkable } from "../../model/Bookmark";
import { CourseSearchResult } from "./CourseSearchResult";
import { Watchable } from "../../model/WatchStatus";
import { VideoSearchResult } from "./VideoSearchResult";
import OmniSearchable from "./OmniSearchable";
import { isCourse } from "../../model/Course";
import { isVideo } from "../../model/Video";
import { isCommentary } from "../../model/Commentary";
import { CommentarySearchResult } from "./CommentarySearchResult";

export interface OmniSearchResultProps {
  item: OmniSearchable;
  matchedStrings: string[];
  isWatched: (item: Watchable) => boolean;
  isBookmarked: (item: Bookmarkable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function OmniSearchResult({
  item,
  isWatched,
  isBookmarked,
  onToggleWatchStatus,
  onToggleBookmark,
  matchedStrings,
}: OmniSearchResultProps) {
  if (isCourse(item)) {
    const result = {
      item,
      matchedStrings: matchedStrings,
    };

    return (
      <CourseSearchResult
        result={result}
        onToggleBookmark={() => onToggleBookmark(item)}
        isBookmarked={(item: Bookmarkable) => isBookmarked(item)}
        key={item.uuid}
        onToggleWatchStatus={onToggleWatchStatus}
        isWatched={(item: Watchable) => isWatched(item)}
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
        matchedStrings={matchedStrings}
      />
    );
  } else if (isCommentary(item)) {
    return <CommentarySearchResult key={item.video.uuid} commentary={item} matchedStrings={matchedStrings} />;
  }

  return <></>;
}
