import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CourseSearch } from "./course/CourseSearch";
import React from "react";
import { Course } from "../model/Course";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Wrapper.css";
import { ErrorBoundary, ErrorPageType } from "./ErrorBoundary";
import { Color, Hero, Size } from "./Hero";
import { Bookmark } from "../model/Bookmark";
import { BookmarkList } from "./bookmark/BookmarkList";
import { VideoSearch } from "./video/VideoSearch";
import { Video } from "../model/Video";

export interface RouterProps {
  courses: Course[];
  videos: Video[];
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
}

export function Router(props: RouterProps) {
  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <BrowserRouter>
            <Navbar />
            <ErrorBoundary type={ErrorPageType.FULL_WITH_NAVBAR}>
              <div>
                <Switch>
                  <Route exact path={["/", "/home"]}>
                    <Home />
                  </Route>
                  <Route path="/courses">
                    <CourseSearch
                      courses={props.courses}
                      onToggleBookmark={props.onToggleBookmark}
                      bookmarks={props.bookmarks}
                    />
                  </Route>
                  <Route path="/videos">
                    <VideoSearch videos={props.videos} />
                  </Route>
                  <Route path="/bookmarks">
                    <BookmarkList bookmarks={props.bookmarks} onToggleBookmark={props.onToggleBookmark} />
                  </Route>
                  <Route path="*">
                    <Hero
                      title="Page Not Found"
                      subtitle="This page doesn't exist"
                      size={Size.FULL_WITH_NAVBAR}
                      color={Color.RED}
                    />
                  </Route>
                </Switch>
              </div>
            </ErrorBoundary>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
