import {Video} from "../../model/Video";
import React from "react";
import {Color, Hero} from "../Hero";

export interface VideoSearchProps {
  videos: Video[];
}

export interface VideoSearchState {

}

export class VideoSearch extends React.Component<VideoSearchProps, VideoSearchState> {
  constructor(props: Readonly<VideoSearchProps>) {
    super(props);
  }

  render() {
    return (
        <React.Fragment>
          <Hero title="Video Search" color={Color.TEAL} />
        </React.Fragment>
    );
  }
}
