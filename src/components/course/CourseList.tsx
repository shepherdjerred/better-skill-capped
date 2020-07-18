import React from "react";
import { Course } from "../../model/Course";
import { rawTitleToDisplayTitle } from "../../utils/TitleUtilities";
import { getCourseUrl, getVideoUrl } from "../../utils/UrlUtilities";

export interface CoursesListProps {
  courses: Course[];
}

export class CourseList extends React.Component<CoursesListProps, unknown> {
  renderCourses() {
    return this.props.courses.map((course) => {
      let displayTitle = course.title;
      displayTitle = rawTitleToDisplayTitle(displayTitle);

      let videos = course.videos.map((video) => {
        return {
          name: rawTitleToDisplayTitle(video.video.title),
          uuid: video.video.uuid,
          link: getVideoUrl(video.video, getCourseUrl(course)),
        };
      });

      let videoList = videos.map((video) => {
        return (
          <li key={video.uuid}>
            <a href={video.link}>{video.name}</a>
          </li>
        );
      });

      return (
        <div key={course.uuid}>
          <h1 className="title">{displayTitle}</h1>
          {course.description}
          <ol>{videoList}</ol>
        </div>
      );
    });
  }

  render() {
    return <React.Fragment>{this.renderCourses()}</React.Fragment>;
  }
}
