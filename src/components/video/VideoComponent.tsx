import React from "react";
import { Video } from "../../model/Video";
import { getVideoUrl } from "../../utils/UrlUtilities";
import { roleToString } from "../../model/Role";
import "./VideoComponent.css";

export interface VideoComponentProps {
  video: Video;
  baseUrl: string;
}

export default class VideoComponent extends React.Component<VideoComponentProps, unknown> {
  render() {
    const video = this.props.video;
    const displayDate = video.releaseDate.toDateString();
    const minutes = Math.round(video.durationInSeconds / 60);
    const seconds = Math.round(video.durationInSeconds % 60);
    const displayDuration = `${minutes}:${seconds / 10 < 1 ? "0" : ""}${seconds}`;
    const displayRole = roleToString(video.role);

    return (
      <div className="box video-component">
        <article className="media">
          <div className="media-left is-128x128">
            <img src={video.imageUrl + "?tr=w-128,h-68,c-force"} alt={video.title} />
          </div>
          <div className="media-content">
            <div className="content">
              <h5 className="title is-5">{video.title}</h5>
              <p>{video.description}</p>
              <div className="tags are-small">
                <span className="tag is-light">{displayRole}</span>
                <span className="tag is-light">{displayDate}</span>
                <span className="tag is-light">{displayDuration}</span>
              </div>
              <div className="buttons">
                <a className="button is-small is-link" href={getVideoUrl(video, this.props.baseUrl)}>
                  Watch
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
