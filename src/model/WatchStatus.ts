import { Video } from "./Video";
import { Course } from "./Course";

export interface WatchStatus {
  item: Video | Course;
  isWatched: boolean;
  lastUpdate: Date;
}
