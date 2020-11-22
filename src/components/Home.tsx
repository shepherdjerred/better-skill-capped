import { Hero, Size } from "./Hero";
import React from "react";
import "./Home.sass";
import { Container } from "./Container";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <Hero title="Better Skill Capped" subtitle="A better way to browse Skill Capped content" size={Size.MEDIUM} />
      <Container>
        <h1 className="title is-2">Getting Started</h1>
        <p>
          Go to <Link to={"/courses"}>courses</Link> and find a course to watch. You can filter through courses by
          typing in the search bar. You can mark individual course videos as watched by clicking on the eye icon to the
          right of the video title. You can bookmark a course or video to watch later by clicking the bookmark icon. You
          can find a list of all courses, bookmarks, or videos by using the link in the navigation bar at the top of the
          page.
        </p>
      </Container>
    </>
  );
}
