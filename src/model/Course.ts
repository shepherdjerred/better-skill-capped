import {Role} from "./Role";
import {CourseVideo} from "./CourseVideo";

export interface Course {
  title: string;
  uuid: string;
  description?: string;
  releaseDate: Date;
  role: Role;
  image: string;
  videos: CourseVideo[];
}
