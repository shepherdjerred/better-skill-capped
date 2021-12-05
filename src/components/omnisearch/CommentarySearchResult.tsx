import { roleToString } from "../../model/Role";
import React from "react";
import { getStreamUrl } from "../../utils/UrlUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import Highlighter from "react-highlight-words";
import { Commentary } from "../../model/Commentary";
import { ToggleBookmarkButton } from "../BookmarkToggleButton";
import { ToggleWatchStatusButton } from "../ToggleWatchStatusButton";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";

export interface CommentarySearchResultProps {
  commentary: Commentary;
  matchedStrings: string[];
  isBookmarked: boolean;
  isWatched: boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
  isDownloadEnabled: boolean;
}

export function CommentarySearchResult(props: CommentarySearchResultProps): React.ReactElement {
  const { commentary, matchedStrings, isDownloadEnabled } = props;
  const {
    role,
    uuid,
    skillCappedUrl,
    title,
    description,
    releaseDate,
    staff,
    matchLink,
    champion,
    opponent,
    kills,
    deaths,
    assists,
    gameLengthInMinutes,
    carry,
    type,
  } = commentary;

  const buttonProps = {
    ...props,
    item: commentary,
  };

  return (
    <div key={uuid} className="box">
      <div className="box-content">
        <div className="columns is-multiline">
          <div className="column is-9">
            <h3 className="title is-5">
              <a href={skillCappedUrl}>
                <Highlighter searchWords={matchedStrings} textToHighlight={title} autoEscape={true} />
              </a>
            </h3>
            <p>
              <a href={matchLink}>Match Link</a>
              <Highlighter searchWords={matchedStrings} textToHighlight={description} autoEscape={true} />
            </p>
            <div className="tags">
              <span className="tag">Role: {roleToString(role)}</span>
              <span className="tag" title={releaseDate.toLocaleString()}>
                Released: {releaseDate.toLocaleDateString()}
              </span>
              <span className="tag">{staff}</span>
              <span className="tag">
                {champion} vs {opponent}
              </span>
              <span className="tag">
                {kills}/{deaths}/{assists}
              </span>
              <span className="tag">{gameLengthInMinutes} minutes</span>
              <span className="tag">{carry}</span>
              <span className="tag">{type}</span>
            </div>
          </div>
          <div className="column is-3">
            <figure className="image is-16by9">
              <img src={commentary.imageUrl} alt="Video thumbnail" className="thumbnail" />
            </figure>
          </div>
          <div className="column is-12">
            <div className="buttons">
              <ToggleBookmarkButton {...buttonProps} />
              <ToggleWatchStatusButton {...buttonProps} />
              {isDownloadEnabled && (
                <a href={getStreamUrl(commentary)} className="button bookmark">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faCloudDownloadAlt} />
                  </span>
                  <span>Download</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
