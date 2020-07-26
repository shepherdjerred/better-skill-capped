import { Video } from "./Video";
import { Course } from "./Course";

export interface Bookmark {
  item: Video | Course;
  date: Date;
}
