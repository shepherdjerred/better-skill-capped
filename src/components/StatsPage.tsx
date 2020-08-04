import { WatchStatus } from "../model/WatchStatus";
import { Content } from "../model/Content";
import { Bookmark } from "../model/Bookmark";
import React from "react";
import { Hero, Size } from "./Hero";
import { Container } from "./Container";

export interface StatsPageProps {
  bookmarks: Bookmark[];
  watchStatuses: WatchStatus[];
  content?: Content;
}

export function StatsPage(props: StatsPageProps) {
  const { bookmarks, watchStatuses, content } = props;
  const courses = content?.courses || [];
  const videos = content?.videos || [];
  const videoCount = videos.length;
  const courseCount = courses.length;
  const watchedItemCount = watchStatuses.reduce((acc, curr) => {
    if (curr.isWatched) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  const bookmarkCount = bookmarks.length;
  const videoItemPercent = Math.round((watchedItemCount / (courseCount + videoCount)) * 100);
  const unmappedVideos = content?.unmappedVideos.length;

  return (
    <React.Fragment>
      <Hero title="Stats" size={Size.SMALL} />
      <Container>
        <div>
          <p>Total videos: {videoCount}</p>
          <p>Total courses: {courseCount}</p>
          <p>
            Watched videos/courses: {watchedItemCount} ({videoItemPercent}%)
          </p>
          <p>Bookmark count: {bookmarkCount}</p>
          <br />
          <p>
            Skill Capped has several videos in their manifest that aren't attached to any course. This makes them
            impossible to access via their website. Below is the count of these "unmapped" videos.
            <br />
            Unmapped videos: {unmappedVideos}
          </p>
        </div>
      </Container>
    </React.Fragment>
  );
}
