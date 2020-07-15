export interface DumpSchema {
  timestamp: number;
  patch: DumpPatch;
  videos: DumpVideo[];
  commentaries: DumpCommentary[];
  staff: DumpStaff[];
  courses: DumpCourse[];
  thisWeekData: DumpThisWeekData;
  videosToCourses: DumpCourseChapters;
}

export interface DumpPatch {
  patchVal: string;
  releaseDate: number;
  patchUrl: string;
}

export interface DumpVideo {
  role: string;
  title: string;
  desc: string;
  rDate: number;
  durSec: number;
  uuid: string;
  tId: number;
  tSS: string;
}

export interface DumpCommentary {
  role: string;
  title: string;
  desc: string;
  rDate: number;
  durSec: number;
  uuid: string;
  tId: number;
  tSS: string;
  staff: string;
  matchLink: string;
  yourChampion: string;
  theirChampion: string;
  k: number;
  d: number;
  a: number;
  gameTime: string;
  carry: string;
  type: string;
}

export interface DumpStaff {
  name: string;
  summonerName: string;
  profileImage: string;
  profileImageWithRank: string;
}

export interface DumpCourse {
  title: string;
  uuid: string;
  desc: string;
  rDate: number;
  role: string;
  courseImage: string;
}

export interface DumpThisWeekData {
  year: number;
  weekNum: number;
  release: number;
  role: string;
  type: string;
  vidTitle: string;
  order: number;
  courseName: string;
}

export interface DumpCourseChapters {
  [key: string]: {
    chapters: [
      {
        title: string;
        vids: [
          {
            uuid: string;
            altTitle?: string;
          }
        ];
      }
    ];
  };
}
