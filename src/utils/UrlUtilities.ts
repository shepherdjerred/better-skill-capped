import { Course } from "../model/Course";
import { Video } from "../model/Video";
import { Commentary } from "../model/Commentary";

const BASE_URL = "https://www.skill-capped.com/lol/browse2";

export function rawTitleToUrlTitle(rawTitle: string): string {
  return rawTitle
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\$/g, "")
    .replace(/[!:.'%,[\]]/g, "");
}

export function getCourseUrl(course: Course): string {
  return BASE_URL + "/" + course.uuid;
}

export function getVideoUrl(video: Video, baseUrl: string): string {
  return baseUrl + "/" + video.uuid;
}

export function getCommentaryUrl(commentary: Commentary): string {
  return BASE_URL + "commentaries/" + commentary.uuid;
}

export function getStreamUrl(video: Video | Commentary): string {
  return `https://www.skill-capped.com/lol/api/new/video/${video.uuid}/4500.m3u8`;
}
