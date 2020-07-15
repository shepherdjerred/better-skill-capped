import React from "react";
import {Course} from "./model/Course";
import VideoComponent from "./VideoComponent";

export interface CourseComponentProps {
  course: Course;
}

export default class CourseComponent extends React.Component<CourseComponentProps, unknown> {
  constructor(props: CourseComponentProps) {
    super(props);
  }

  render() {
    const videos = this.props.course.videos.map((video) => {
      return (
          <div key={video.video.uuid}>
            <VideoComponent video={video.video}/>
          </div>
      )
    });

    let displayTitle = this.props.course.title;

    return (
        <div>
          <h1>{displayTitle}</h1>
          {videos}
        </div>
    );
  }
}
