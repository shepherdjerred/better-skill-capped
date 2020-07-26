import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CourseSearch } from "./course/CourseSearch";
import React from "react";
import { Course } from "../model/Course";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Wrapper.css";
import { Color, Hero, Size } from "./Hero";
import { Bookmark } from "../model/Bookmark";
import { BookmarkList } from "./bookmark/BookmarkList";
import { VideoSearch } from "./video/VideoSearch";
import { Video } from "../model/Video";
import { WatchStatus } from "../model/WatchStatus";
import * as Sentry from "@sentry/react";

export interface RouterProps {
  courses: Course[];
  videos: Video[];
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
  watchStatuses: WatchStatus[];
  onToggleWatchStatus: (course: Course) => void;
}

export function Router(props: RouterProps) {
  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <BrowserRouter>
            <Navbar />
            <Sentry.ErrorBoundary fallback={<Hero title="Something went wrong" color={Color.RED} size={Size.FULL_WITH_NAVBAR} />}>
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
                      onToggleWatchStatus={props.onToggleWatchStatus}
                      watchStatuses={props.watchStatuses}
                    />
                  </Route>
                  <Route path="/videos">
                    <VideoSearch videos={props.videos} />
                  </Route>
                  <Route path="/bookmarks">
                    <BookmarkList
                      bookmarks={props.bookmarks}
                      onToggleBookmark={props.onToggleBookmark}
                      watchStatuses={props.watchStatuses}
                      onToggleWatchStatus={props.onToggleWatchStatus}
                    />
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
            </Sentry.ErrorBoundary>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
