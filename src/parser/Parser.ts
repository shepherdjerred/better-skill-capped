import {Content} from "../model/Content";
import {DumpCommentary, DumpCourse, DumpCourseChapters, DumpSchema, DumpVideo} from "./DumpSchema";
import {Video} from "../model/Video";
import {Course} from "../model/Course";
import {Commentary} from "../model/Commentary";
import {Role} from "../model/Role";

export class Parser {
  parse(input: string): Content {
    const dump: DumpSchema = JSON.parse(input)
    return {
      videos: this.parseVideos(dump.videos),
      courses: this.parseCourses(dump.videos, dump.courses, dump.videosToCourses),
      commentaries: this.parseCommentaries(dump.commentaries)
    };
  }

  parseRole(input: string): Role {
    switch (input.toUpperCase()) {
      case "TOP":
        return Role.TOP;
      case "JUNGLE":
        return Role.JUNGLE
      case"MID":
        return Role.MID
      case "ADC":
        return Role.ADC
      case "SUPPORT":
        return Role.SUPPORT
      case "ALL":
        return Role.ALL
      default:
        throw new Error(`Unknown role: ${input}`);
    }
  }

  parseDate(input: number) {
    const releaseDate = new Date(0);
    releaseDate.setUTCSeconds(input);
    return releaseDate;
  }

  parseVideos(input: DumpVideo[]): Video[] {
    return input.map((video: DumpVideo): Video => {
      const releaseDate = this.parseDate(video.rDate);
      const role = this.parseRole(video.role);

      return {
        role,
        title: video.title,
        description: video.desc,
        releaseDate,
        durationInSeconds: video.durSec,
        uuid: video.uuid
      }
    })
  }

  parseCourses(dumpVideos: DumpVideo[], dumpCourses: DumpCourse[], dumpCourseChapters: DumpCourseChapters): Course[] {
    const videos = this.parseVideos(dumpVideos);

    return dumpCourses.map((course): Course => {
      const releaseDate = this.parseDate(course.rDate);
      const role = this.parseRole(course.role);

      const courseVideos = dumpCourseChapters[course.title].chapters[0].vids.map(video => {
        const videoInfo = videos.find((candidate) => candidate.uuid == video.uuid)

        if (videoInfo == undefined) {
          throw new Error(`Couldn't find video ${video}`);
        }

        return {
          video: videoInfo,
          altTitle: video.altTitle || undefined
        };
      })

      return {
        title: course.title,
        uuid: course.uuid,
        description: course.desc || undefined,
        releaseDate: releaseDate,
        role: role,
        image: course.courseImage,
        videos: courseVideos
      }
    })
  }

  parseCommentaries(dumpCommentary: DumpCommentary[]): Commentary[] {
    return [];
  }
}

