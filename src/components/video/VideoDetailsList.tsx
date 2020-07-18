import React from "react";
import VideoDetails from "./VideoDetails";
import { Video } from "../../model/Video";

export interface VideoDetailsListProps {
  videos: Video[];
  baseUrl: string;
}

export class VideoDetailsList extends React.PureComponent<VideoDetailsListProps, unknown> {
  renderCourses() {
    return this.props.videos.map((video) => {
      return (
        <div key={video.uuid}>
          <VideoDetails video={video} baseUrl={this.props.baseUrl} />
        </div>
      );
    });
  }

  render() {
    return <React.Fragment>{this.renderCourses()}</React.Fragment>;
  }
}
