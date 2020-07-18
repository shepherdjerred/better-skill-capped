import { Content } from "../model/Content";
import { DumpCommentary, DumpCourse, DumpCourseChapters, DumpSchema, DumpVideo } from "./DumpSchema";
import { Video } from "../model/Video";
import { Course } from "../model/Course";
import { Commentary } from "../model/Commentary";
import { roleFromString } from "../model/Role";
import { rawTitleToDisplayTitle } from "../utils/TitleUtilities";

export class Parser {
  parse(input: string): Content {
    const dump: DumpSchema = JSON.parse(input);
    return {
      videos: this.parseVideos(dump.videos),
      courses: this.parseCourses(dump.videos, dump.courses, dump.videosToCourses),
      commentaries: this.parseCommentaries(dump.commentaries),
    };
  }

  parseDate(input: number) {
    const releaseDate = new Date(0);
    releaseDate.setUTCMilliseconds(input);
    return releaseDate;
  }

  parseVideos(input: DumpVideo[]): Video[] {
    return input.map(
      (video: DumpVideo): Video => {
        const releaseDate = this.parseDate(video.rDate);
        const role = roleFromString(video.role);
        const imageUrl = this.getImageUrl(video);
        const title = rawTitleToDisplayTitle(video.title);

        return {
          role,
          title,
          description: video.desc,
          releaseDate,
          durationInSeconds: video.durSec,
          uuid: video.uuid,
          imageUrl,
        };
      }
    );
  }

  getImageUrl(input: DumpVideo): string {
    if (input.tSS !== "") {
      return input.tSS.replace(
        "https://d20k8dfo6rtj2t.cloudfront.net/jpg-images/",
        "https://ik.imagekit.io/skillcapped/customss/jpg-images/"
      );
    } else {
      return `https://ik.imagekit.io/skillcapped/thumbnails/${input.uuid}/thumbnails/thumbnail_${input.tId}.jpg`;
    }
  }

  parseCourses(dumpVideos: DumpVideo[], dumpCourses: DumpCourse[], dumpCourseChapters: DumpCourseChapters): Course[] {
    const videos = this.parseVideos(dumpVideos);

    return dumpCourses.map(
      (course): Course => {
        const releaseDate = this.parseDate(course.rDate);
        const role = roleFromString(course.role);
        const title = rawTitleToDisplayTitle(course.title);

        const courseVideos = dumpCourseChapters[course.title].chapters[0].vids
          .map((video) => {
            const videoInfo = videos.find((candidate) => candidate.uuid === video.uuid);
            const altTitle = video.altTitle !== undefined ? rawTitleToDisplayTitle(video.altTitle) : undefined;

            if (videoInfo === undefined) {
              throw new Error(`Couldn't find video ${video}`);
            }

            return {
              video: videoInfo,
              altTitle,
            };
          })
          .map((video) => {
            return {
              ...video,
              course: course,
            };
          });

        return {
          title,
          uuid: course.uuid,
          description: course.desc || undefined,
          releaseDate: releaseDate,
          role: role,
          image: course.courseImage,
          videos: courseVideos,
        };
      }
    );
  }

  parseCommentaries(_dumpCommentary: DumpCommentary[]): Commentary[] {
    return [];
  }
}
