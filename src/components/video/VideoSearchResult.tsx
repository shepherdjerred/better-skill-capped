import {roleToString} from "../../model/Role";
import React from "react";
import {Video} from "../../model/Video";

export interface VideoSearchResultProps {
  video: Video;
}

export function VideoSearchResult(props: VideoSearchResultProps) {

  const {video} = props;

  return (
      <div key={video.uuid} className="box">
        <div className="box-content">
          <h3 className="title is-5">
            <a href={video.skillCappedUrl}>{video.title}</a>
          </h3>
          <p>
            {video.description}
          </p>
          <div className="tags">
            <span className="tag">{roleToString(video.role)}</span>
            <span className="tag" title={video.releaseDate.toLocaleString()}>
            {video.releaseDate.toLocaleDateString()}
          </span>
          </div>
        </div>
      </div>
  );
}
