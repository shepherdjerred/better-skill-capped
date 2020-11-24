import { Course } from "../model/Course";
import { Video } from "../model/Video";

const BASE_URL = "https://www.skill-capped.com/lol/";

export function rawTitleToUrlTitle(rawTitle: string) {
  return rawTitle
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\$/g, "")
    .replace(/[!:.'%,[\]]/g, "");
}

export function getCourseUrl(course: Course): string {
  const courseName = rawTitleToUrlTitle(course.title);
  return BASE_URL + "course/" + courseName + "/" + course.uuid + "/";
}

export function getVideoUrl(video: Video, baseUrl: string): string {
  const videoName = rawTitleToUrlTitle(video.title);
  return baseUrl + videoName + "/" + video.uuid;
}

export function getCommentaryUrl(video: Video): string {
  return BASE_URL + "commentaries/" + video.uuid;
}

export function getStreamUrl(video: Video): string {
  return `https://www.skill-capped.com/lol/api/dailyvideo/${video.uuid}/4500.m3u8`;
}
