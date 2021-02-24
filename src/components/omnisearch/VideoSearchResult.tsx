import { roleToString } from "../../model/Role";
import React from "react";
import { Video } from "../../model/Video";
import { ToggleWatchStatusButton } from "../ToggleWatchStatusButton";
import { ToggleBookmarkButton } from "../BookmarkToggleButton";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import { getStreamUrl } from "../../utils/UrlUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import Highlighter from "react-highlight-words";

export interface VideoSearchResultProps {
  video: Video;
  isBookmarked: boolean;
  isWatched: boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
  matchedStrings: string[];
}

export function VideoSearchResult(props: VideoSearchResultProps): React.ReactElement {
  const { video, matchedStrings } = props;
  const buttonProps = {
    ...props,
    item: video,
  };

  return (
    <div key={video.uuid} className="box">
      <div className="box-content">
        <h3 className="title is-5">
          <a href={video.skillCappedUrl}>
            <Highlighter searchWords={matchedStrings} textToHighlight={video.title} autoEscape={true} />
          </a>
        </h3>
        <p>
          <Highlighter searchWords={matchedStrings} textToHighlight={video.description} autoEscape={true} />
        </p>
        <div className="tags">
          <span className="tag">{roleToString(video.role)}</span>
          <span className="tag" title={video.releaseDate.toLocaleString()}>
            {video.releaseDate.toLocaleDateString()}
          </span>
        </div>
        <div className="buttons">
          <ToggleBookmarkButton {...buttonProps} />
          <ToggleWatchStatusButton {...buttonProps} />
          <a href={getStreamUrl(video)} className="button bookmark">
            <span className="icon is-small">
              <FontAwesomeIcon icon={faCloudDownloadAlt} />
            </span>
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}
