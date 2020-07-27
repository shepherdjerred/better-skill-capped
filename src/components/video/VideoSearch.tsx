import {Video} from "../../model/Video";
import React from "react";
import {Color, Hero} from "../Hero";
import {Container} from "../Container";
import {roleToString} from "../../model/Role";

export interface VideoSearchProps {
  videos: Video[];
}

export interface VideoSearchState {
}

export class VideoSearch extends React.Component<VideoSearchProps, VideoSearchState> {
  render() {
    const videos = this.props.videos.map((video) => {
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
    });
    return (
        <React.Fragment>
          <Hero title="Video Search" color={Color.TEAL}/>
          <Container>{videos}</Container>
        </React.Fragment>
    );
  }
}
