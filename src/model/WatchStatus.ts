import { Video } from "./Video";
import { Course } from "./Course";

export type Watchable = Video | Course;

export interface WatchStatus {
  item: Watchable;
  isWatched: boolean;
  lastUpdate: Date;
}
