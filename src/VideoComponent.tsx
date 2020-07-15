import React from "react";
import {Video} from "./model/Video";

export interface VideoComponentProps {
  video: Video;
}

export default class VideoComponent extends React.Component<VideoComponentProps, unknown> {
  constructor(props: VideoComponentProps) {
    super(props);
  }

  render() {
    return (
        <div>
          <p>
            {this.props.video.title}
          </p>
        </div>
    );
  }
}
