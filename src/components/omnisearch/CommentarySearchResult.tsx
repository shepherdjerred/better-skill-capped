import { roleToString } from "../../model/Role";
import React from "react";
import { getStreamUrl } from "../../utils/UrlUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import Highlighter from "react-highlight-words";
import { Commentary } from "../../model/Commentary";

export interface CommentarySearchResultProps {
  commentary: Commentary;
  matchedStrings: string[];
}

export function CommentarySearchResult(props: CommentarySearchResultProps) {
  const { commentary, matchedStrings } = props;
  const { staff, matchLink, champion, opponent, kills, deaths, assists, gameLengthInMinutes, carry, type } = commentary;
  const video = commentary.video;

  return (
    <div key={video.uuid} className="box">
      <div className="box-content">
        <h3 className="title is-5">
          <a href={video.skillCappedUrl}>
            <Highlighter searchWords={matchedStrings} textToHighlight={video.title} autoEscape={true} />
          </a>
        </h3>
        <p>
          {matchLink}
          <Highlighter searchWords={matchedStrings} textToHighlight={video.description} autoEscape={true} />
        </p>
        <div className="tags">
          <span className="tag">{roleToString(video.role)}</span>
          <span className="tag" title={video.releaseDate.toLocaleString()}>
            {video.releaseDate.toLocaleDateString()}
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
        <div className="buttons">
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
