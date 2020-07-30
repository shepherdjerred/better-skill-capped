import {Video} from "../../model/Video";
import React from "react";
import {Color, Hero} from "../Hero";
import {Container} from "../Container";
import {VideoSearchResult} from "./VideoSearchResult";

export interface VideoSearchProps {
  videos: Video[];
}

export interface VideoSearchState {
}

export class VideoSearch extends React.Component<VideoSearchProps, VideoSearchState> {
  render() {
    const videos = this.props.videos.map((video) => {
      return <VideoSearchResult video={video}/>
    });
    return (
        <React.Fragment>
          <Hero title="Video Search" color={Color.TEAL}/>
          <Container>{videos}</Container>
        </React.Fragment>
    );
  }
}
