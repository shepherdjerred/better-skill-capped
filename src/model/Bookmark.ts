import { Video } from "./Video";
import { Course } from "./Course";

export interface Bookmark {
  item: Bookmarkable;
  date: Date;
}

export type Bookmarkable = Video | Course;
