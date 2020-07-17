import React from "react";
import VideoComponent from "./VideoComponent";
import { Video } from "../model/Video";

export interface VideoListProps {
  videos: Video[];
  baseUrl: string;
}

export class VideoList extends React.Component<VideoListProps, any> {
  renderCourses() {
    return this.props.videos.map((video) => {
      return (
        <div key={video.uuid}>
          <VideoComponent video={video} baseUrl={this.props.baseUrl} />
        </div>
      );
    });
  }

  render() {
    return <React.Fragment>{this.renderCourses()}</React.Fragment>;
  }
}
