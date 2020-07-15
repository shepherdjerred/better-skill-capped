import {Course} from "../model/Course";
import {Video} from "../model/Video";

const BASE_URL = "https://www.skill-capped.com/lol/course/";

export function rawTitleToUrlTitle(rawTitle: string) {
  return rawTitle.toLowerCase().replace(/ /g, "-").replace(/\$/g, "").replace(/!:/g, "");
}

export function getCourseUrl(course: Course): string {
  const courseName = rawTitleToUrlTitle(course.title);
  return BASE_URL + courseName + "/" + course.uuid + "/";
}

export function getVideoUrl(video: Video, baseUrl: string): string {
  const videoName = rawTitleToUrlTitle(video.title);
  return baseUrl + videoName + "/" + video.uuid;
}
