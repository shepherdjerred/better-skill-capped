import {Video} from "../../model/Video";
import React from "react";
import {Color, Hero} from "../Hero";
import {Container} from "../Container";
import {VideoSearchResult} from "./VideoSearchResult";

export interface VideoSearchProps {
  videos: Video[];
}

export function VideoSearch(props: VideoSearchProps) {
  const videos = props.videos.map((video) => {
    return <VideoSearchResult video={video}/>
  });

  return (
      <React.Fragment>
        <Hero title="Video Search" color={Color.TEAL}/>
        <Container>{videos}</Container>
      </React.Fragment>
  );
}
