import { Content } from "../model/Content";
import { ManifestCommentary, ManifestCourse, ManifestCourseChapters, Manifest, ManifestVideo } from "./Manifest";
import { Video } from "../model/Video";
import { Course } from "../model/Course";
import { Commentary } from "../model/Commentary";
import { roleFromString } from "../model/Role";
import { rawTitleToDisplayTitle } from "../utils/TitleUtilities";
import { getCourseUrl, getVideoUrl } from "../utils/UrlUtilities";

export class Parser {
  parse(input: string): Content {
    const manifest: Manifest = JSON.parse(input);
    return {
      videos: this.parseVideos(manifest.videos, manifest.courses, manifest.videosToCourses),
      courses: this.parseCourses(manifest.videos, manifest.courses, manifest.videosToCourses),
      commentaries: this.parseCommentaries(manifest.commentaries),
    };
  }

  parseDate(input: number) {
    const releaseDate = new Date(0);
    releaseDate.setUTCMilliseconds(input);
    return releaseDate;
  }

  parseVideos(input: ManifestVideo[], courses: ManifestCourse[], chapters: ManifestCourseChapters): Video[] {
    return input.flatMap((video: ManifestVideo): Video | Video[] => {
      const releaseDate = this.parseDate(video.rDate);
      const role = roleFromString(video.role);
      const imageUrl = this.getImageUrl(video);
      const title = rawTitleToDisplayTitle(video.title);

      let courseTitle: string | null = null;
      for (const [key, value] of Object.entries(chapters)) {
        const match =
          value.chapters[0].vids.find((courseVideo) => {
            return courseVideo.uuid === video.uuid;
          }) !== undefined;
        if (match) {
          courseTitle = key;
          break;
        }
      }

      if (courseTitle === null) {
        console.trace(`Could not find course for video ${JSON.stringify(video)}`);
        return [];
      }

      const matchedCourse = courses.find((candidate) => {
        return courseTitle === candidate.title;
      });

      if (matchedCourse === undefined) {
        console.trace(`Could not find course for name ${courseTitle}`);
        return [];
      }

      const courseUuid = matchedCourse.uuid;

      const fakeCourse = {
        uuid: courseUuid,
        title: courseTitle,
      } as Course;

      const fakeVideo = {
        title: video.title,
        uuid: video.uuid,
      } as Video;

      const courseUrl = getCourseUrl(fakeCourse);
      const videoUrl = getVideoUrl(fakeVideo, courseUrl);

      return {
        role,
        title,
        description: video.desc,
        releaseDate,
        durationInSeconds: video.durSec,
        uuid: video.uuid,
        imageUrl,
        skillCappedUrl: videoUrl,
      };
    });
  }

  getImageUrl(input: ManifestVideo): string {
    if (input.tSS !== "") {
      return input.tSS.replace(
        "https://d20k8dfo6rtj2t.cloudfront.net/jpg-images/",
        "https://ik.imagekit.io/skillcapped/customss/jpg-images/"
      );
    } else {
      return `https://ik.imagekit.io/skillcapped/thumbnails/${input.uuid}/thumbnails/thumbnail_${input.tId}.jpg`;
    }
  }

  parseCourses(
    manifestVideos: ManifestVideo[],
    manifestCourses: ManifestCourse[],
    manifestCourseChapters: ManifestCourseChapters
  ): Course[] {
    const videos = this.parseVideos(manifestVideos, manifestCourses, manifestCourseChapters);

    return manifestCourses.map(
      (course): Course => {
        const releaseDate = this.parseDate(course.rDate);
        const role = roleFromString(course.role);
        const title = rawTitleToDisplayTitle(course.title);

        const courseVideos = manifestCourseChapters[course.title].chapters[0].vids.map((video) => {
          const videoInfo = videos.find((candidate) => candidate.uuid === video.uuid);
          const altTitle = video.altTitle !== undefined ? rawTitleToDisplayTitle(video.altTitle) : undefined;

          if (videoInfo === undefined) {
            throw new Error(`Couldn't find video ${video}`);
          }

          return {
            video: videoInfo,
            altTitle,
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

  parseCommentaries(_dumpCommentary: ManifestCommentary[]): Commentary[] {
    return [];
  }
}
