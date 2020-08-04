import { roleToString } from "../../model/Role";
import React from "react";
import { Video } from "../../model/Video";
import { ToggleWatchStatusButton } from "../ToggleWatchStatusButton";
import { ToggleBookmarkButton } from "../bookmark/ToggleButton";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import { getStreamUrl } from "../../utils/UrlUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";

export interface VideoSearchResultProps {
  video: Video;
  isBookmarked: boolean;
  isWatched: boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function VideoSearchResult(props: VideoSearchResultProps) {
  const { video } = props;
  const buttonProps = {
    ...props,
    item: video,
  };

  return (
    <div key={video.uuid} className="box">
      <div className="box-content">
        <h3 className="title is-5">
          <a href={video.skillCappedUrl}>{video.title}</a>
        </h3>
        <p>{video.description}</p>
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
