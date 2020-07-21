import { CourseVideo } from "./CourseVideo";
import { Video } from "./Video";
import { Course } from "./Course";

export interface Bookmark {
  item: Video | CourseVideo | Course;
  date: Date;
}
