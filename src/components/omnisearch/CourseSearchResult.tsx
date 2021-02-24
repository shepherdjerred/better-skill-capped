import { Course } from "../../model/Course";
import React from "react";
import Highlighter from "react-highlight-words";
import "./CourseSearchResult.css";
import { Watchable } from "../../model/WatchStatus";
import { FuseSearchResult } from "./search/FuseSearch";
import { CourseSearchResultVideo } from "./CourseSearchResultVideo";
import { roleToString } from "../../model/Role";
import { ToggleBookmarkButton } from "../BookmarkToggleButton";
import { ToggleWatchStatusButton } from "../ToggleWatchStatusButton";
import { Bookmarkable } from "../../model/Bookmark";

export interface CourseSearchResultProps {
  result: FuseSearchResult<Course>;
  onToggleBookmark: (item: Bookmarkable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function CourseSearchResult(props: CourseSearchResultProps): React.ReactElement {
  const { result, isWatched, onToggleWatchStatus, onToggleBookmark, isBookmarked } = props;
  const { matchedStrings, item: course } = result;

  const videos = course.videos.map(({ video }) => {
    return (
      <CourseSearchResultVideo
        key={video.uuid}
        matchedStrings={matchedStrings}
        course={course}
        video={video}
        onToggleWatchStatus={onToggleWatchStatus}
        isWatched={isWatched(video)}
        onToggleBookmark={onToggleBookmark}
        isBookmarked={isBookmarked(video)}
      />
    );
  });

  return (
    <div key={course.uuid} className="box">
      <div className="box-content">
        <h3 className="title">
          <Highlighter searchWords={props.result.matchedStrings} textToHighlight={course.title} autoEscape={true} />
        </h3>
        <p>{course.description}</p>
        <div className="tags">
          <span className="tag">{roleToString(props.result.item.role)}</span>
          <span className="tag" title={props.result.item.releaseDate.toLocaleString()}>
            Posted: {props.result.item.releaseDate.toLocaleDateString()}
          </span>
        </div>
        <div>
          <ol>{videos}</ol>
        </div>
        <div className="buttons">
          <ToggleBookmarkButton item={course} isBookmarked={isBookmarked(course)} onToggleBookmark={onToggleBookmark} />
          <ToggleWatchStatusButton
            item={course}
            isWatched={isWatched(course)}
            onToggleWatchStatus={onToggleWatchStatus}
          />
        </div>
      </div>
    </div>
  );
}
