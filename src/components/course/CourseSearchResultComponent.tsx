import {Course} from "../../model/Course";
import {getCourseUrl, getVideoUrl} from "../../utils/UrlUtilities";
import React from "react";
import Highlighter from "react-highlight-words";
import "./CourseSearchResultComponent.css"

export interface CourseSearchResult {
  course: Course;
  matches: string[];
}

export interface CourseSearchResultProps {
  result: CourseSearchResult;
}

export function CourseSearchResultComponent(props: CourseSearchResultProps) {
  const course = props.result.course;

  let videos = course.videos
  .map((video) => {
    return {
      name: video.video.title,
      uuid: video.video.uuid,
      link: getVideoUrl(video.video, getCourseUrl(course)),
    };
  })
  .map((video) => {
    return (
        <li key={video.uuid}>
          <a href={video.link}>
            <Highlighter searchWords={props.result.matches} textToHighlight={video.name}
                         autoEscape={true}/>
          </a>
        </li>
    );
  });

  return (
      <div key={course.uuid} className="box">
        <div className="box-content">
          <h3 className="title">
            <Highlighter searchWords={props.result.matches} textToHighlight={course.title}
                         autoEscape={true}/>
          </h3>
          <p>
            {course.description}
          </p>
          <p>
            <ol>{videos}</ol>
          </p>
        </div>
      </div>
  );
}
