import React from "react";
import { Course } from "../../model/Course";
import { rawTitleToDisplayTitle } from "../../utils/TitleUtilities";
import { getCourseUrl } from "../../utils/UrlUtilities";
import { VideoList } from "../video/VideoList";

export interface CourseComponentProps {
  course: Course;
}

export default class _CourseVideoComponent extends React.PureComponent<CourseComponentProps, unknown> {
  render() {
    let videos = this.props.course.videos.map((video) => video.video);
    let displayTitle = this.props.course.title;
    displayTitle = rawTitleToDisplayTitle(displayTitle);

    return (
      <div>
        <h1 className="title">{displayTitle}</h1>
        <VideoList videos={videos} baseUrl={getCourseUrl(this.props.course)} />
      </div>
    );
  }
}
