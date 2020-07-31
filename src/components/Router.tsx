import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CourseSearchPage } from "./course/SearchPage";
import React from "react";
import { Course } from "../model/Course";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Wrapper.css";
import { Color, Hero, Size } from "./Hero";
import { Bookmark, Bookmarkable } from "../model/Bookmark";
import { VideoSearchPage } from "./video/SearchPage";
import { Video } from "../model/Video";
import { Watchable, WatchStatus } from "../model/WatchStatus";
import * as Sentry from "@sentry/react";
import { BookmarkListPage } from "./bookmark/ListPage";

export interface RouterProps {
  courses: Course[];
  videos: Video[];
  bookmarks: Bookmark[];
  onToggleBookmark: (item: Bookmarkable) => void;
  watchStatuses: WatchStatus[];
  onToggleWatchStatus: (item: Watchable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
}

export function Router(props: RouterProps) {
  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <BrowserRouter>
            <Navbar />
            <Sentry.ErrorBoundary
              fallback={<Hero title="Something went wrong" color={Color.RED} size={Size.FULL_WITH_NAVBAR} />}
            >
              <div>
                <Switch>
                  <Route exact path={["/", "/home"]}>
                    <Home />
                  </Route>
                  <Route path="/courses">
                    <CourseSearchPage
                      courses={props.courses}
                      onToggleBookmark={props.onToggleBookmark}
                      onToggleWatchStatus={props.onToggleWatchStatus}
                      isBookmarked={props.isBookmarked}
                      isWatched={props.isWatched}
                    />
                  </Route>
                  <Route path="/videos">
                    <VideoSearchPage
                      videos={props.videos}
                      onToggleBookmark={props.onToggleBookmark}
                      onToggleWatchStatus={props.onToggleWatchStatus}
                      isBookmarked={props.isBookmarked}
                      isWatched={props.isWatched}
                    />
                  </Route>
                  <Route path="/bookmarks">
                    <BookmarkListPage
                      bookmarks={props.bookmarks}
                      onToggleBookmark={props.onToggleBookmark}
                      onToggleWatchStatus={props.onToggleWatchStatus}
                      isWatched={props.isWatched}
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
