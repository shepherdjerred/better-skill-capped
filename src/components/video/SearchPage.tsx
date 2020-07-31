import { Video } from "../../model/Video";
import React from "react";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { VideoSearchResult } from "./SearchResult";
import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";

export interface VideoSearchPageProps {
  videos: Video[];
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function VideoSearchPage(props: VideoSearchPageProps) {
  const videos = props.videos.map((video) => {
    return (
      <VideoSearchResult
        key={video.uuid}
        video={video}
        {...props}
        isBookmarked={props.isBookmarked(video)}
        isWatched={props.isWatched(video)}
      />
    );
  });

  return (
    <React.Fragment>
      <Hero title="Video Search" color={Color.TEAL} />
      <Container>{videos}</Container>
    </React.Fragment>
  );
}
