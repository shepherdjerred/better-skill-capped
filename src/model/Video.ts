import { Role } from "./Role";

export interface Video {
  role: Role;
  title: string;
  description: string;
  releaseDate: Date;
  durationInSeconds: number;
  uuid: string;
  imageUrl: string;
}
