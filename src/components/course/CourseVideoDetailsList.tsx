import React from "react";
import { Course } from "../../model/Course";
import { rawTitleToDisplayTitle } from "../../utils/TitleUtilities";
import { getCourseUrl } from "../../utils/UrlUtilities";
import { VideoDetailsList } from "../video/VideoDetailsList";

export interface CourseVideoDetailsListProps {
  course: Course;
}

export default class _CourseVideoComponent extends React.PureComponent<CourseVideoDetailsListProps, unknown> {
  render() {
    let videos = this.props.course.videos.map((video) => video.video);
    let displayTitle = this.props.course.title;
    displayTitle = rawTitleToDisplayTitle(displayTitle);

    return (
      <div>
        <h1 className="title">{displayTitle}</h1>
        <VideoDetailsList videos={videos} baseUrl={getCourseUrl(this.props.course)} />
      </div>
    );
  }
}
