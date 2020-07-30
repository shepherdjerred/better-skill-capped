import { Course } from "../../model/Course";
import { getCourseUrl, getVideoUrl } from "../../utils/UrlUtilities";
import React from "react";
import Highlighter from "react-highlight-words";
import "./CourseSearchResultComponent.css";
import { roleToString } from "../../model/Role";
import {Video} from "../../model/Video";

export interface CourseSearchResult {
  course: Course;
  matches: string[];
}

export interface CourseSearchResultProps {
  result: CourseSearchResult;
  onToggleBookmark: () => void;
  isBookmarked: boolean;
  isWatched: (item: Video | Course) => boolean;
  onToggleWatchStatus: (item: Video | Course) => void;
}

function BookmarkButton(isBookmarked: boolean, onToggle: () => void) {
  if (isBookmarked) {
    return (
      <button className="button is-warning bookmark" onClick={onToggle}>
        Unbookmark
      </button>
    );
  } else {
    return (
      <button className="button is-warning bookmark" onClick={onToggle}>
        Bookmark
      </button>
    );
  }
}

function WatchStatusButton(isWatched: boolean, onToggle: () => void) {
  if (isWatched) {
    return (
      <button className="button bookmark" onClick={onToggle}>
        Mark as unwatched
      </button>
    );
  } else {
    return (
      <button className="button bookmark" onClick={onToggle}>
        Mark as watched
      </button>
    );
  }
}

export function CourseSearchResultComponent(props: CourseSearchResultProps) {
  const course = props.result.course;

  const videos = course.videos
    .map((video) => {
      return {
        name: video.video.title,
        uuid: video.video.uuid,
        link: getVideoUrl(video.video, getCourseUrl(course)),
        video: video
      };
    })
    .map((video) => {
      const isWatched = props.isWatched(video.video.video);

      return (
        <li key={video.uuid}>
          <a href={video.link}>
            <Highlighter searchWords={props.result.matches} textToHighlight={video.name} autoEscape={true} />
          </a>
          {" "}
          <button onClick={() => props.onToggleWatchStatus(video.video.video)} className="video-watched-button tag is-small">{isWatched ? "Mark unwatched" : "Mark watched"}</button>
        </li>
      );
    });

  return (
    <div key={course.uuid} className="box">
      <div className="box-content">
        <h3 className="title">
          <Highlighter searchWords={props.result.matches} textToHighlight={course.title} autoEscape={true} />
        </h3>
        <p>{course.description}</p>
        <div className="tags">
          <span className="tag">{roleToString(props.result.course.role)}</span>
          <span className="tag" title={props.result.course.releaseDate.toLocaleString()}>
            {props.result.course.releaseDate.toLocaleDateString()}
          </span>
        </div>
        <div>
          <ol>{videos}</ol>
        </div>
        <div className="buttons">
          {BookmarkButton(props.isBookmarked, props.onToggleBookmark)}
          {WatchStatusButton(props.isWatched(props.result.course), () => props.onToggleWatchStatus(props.result.course))}
        </div>
      </div>
    </div>
  );
}
