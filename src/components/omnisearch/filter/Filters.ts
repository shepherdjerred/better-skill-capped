import { Role } from "../../../model/Role";

export type Type = "Course" | "Video" | "Commentary";

export interface Filters {
  roles: Role[];
  types: Type[];
  onlyBookmarked: boolean;
  onlyUnwatched: boolean;
}
