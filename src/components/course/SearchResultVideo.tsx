import { Video } from "../../model/Video";
import { Course } from "../../model/Course";
import Highlighter from "react-highlight-words";
import React from "react";
import { getCourseUrl, getVideoUrl } from "../../utils/UrlUtilities";
import { Bookmarkable } from "../../model/Bookmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Watchable } from "../../model/WatchStatus";

export interface SearchResultVideoProps {
  matchedStrings: string[];
  course: Course;
  video: Video;
  onToggleWatchStatus: (item: Watchable) => void;
  onToggleBookmark: (item: Bookmarkable) => void;
  isWatched: boolean;
  isBookmarked: boolean;
}

export function CourseSearchResultVideo(props: SearchResultVideoProps) {
  const { course, video, matchedStrings, isWatched } = props;
  // TODO: use alt title from course video
  const { title } = video;

  const link = getVideoUrl(video, getCourseUrl(course));

  const watchToggleIcon = isWatched ? faEyeSlash : faEye;
  const watchToggleHint = isWatched ? "Mark as unwatched" : "Watch as watched";
  const textStyle = isWatched ? "has-text-grey-lighter" : "";

  return (
    <li>
      <a href={link} className={textStyle}>
        <Highlighter searchWords={matchedStrings} textToHighlight={title} autoEscape={true} />
      </a>{" "}
      <button
        onClick={() => props.onToggleWatchStatus(video)}
        className="video-watched-button tag is-small is-outlined is-inverted is-rounded"
        title={watchToggleHint}
      >
        <FontAwesomeIcon icon={watchToggleIcon} />
      </button>
    </li>
  );
}
