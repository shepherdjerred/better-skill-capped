import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CourseSearchPage } from "./course/SearchPage";
import React from "react";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Wrapper.css";
import { Color, Hero, Size } from "./Hero";
import { Bookmark, Bookmarkable } from "../model/Bookmark";
import { VideoSearchPage } from "./video/SearchPage";
import { Watchable, WatchStatus } from "../model/WatchStatus";
import * as Sentry from "@sentry/react";
import { BookmarkListPage } from "./bookmark/ListPage";
import { StatsPage } from "./StatsPage";
import { Content } from "../model/Content";

export interface RouterProps {
  content?: Content;
  bookmarks: Bookmark[];
  onToggleBookmark: (item: Bookmarkable) => void;
  watchStatuses: WatchStatus[];
  onToggleWatchStatus: (item: Watchable) => void;
  isBookmarked: (item: Bookmarkable) => boolean;
  isWatched: (item: Watchable) => boolean;
}

export function Router(props: RouterProps) {
  const { content, bookmarks, onToggleBookmark, onToggleWatchStatus, isBookmarked, isWatched, watchStatuses } = props;
  const courses = content?.courses || [];
  const videos = content?.videos || [];

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
                      courses={courses}
                      onToggleBookmark={onToggleBookmark}
                      onToggleWatchStatus={onToggleWatchStatus}
                      isBookmarked={isBookmarked}
                      isWatched={isWatched}
                    />
                  </Route>
                  <Route path="/videos">
                    <VideoSearchPage
                      videos={videos}
                      onToggleBookmark={onToggleBookmark}
                      onToggleWatchStatus={onToggleWatchStatus}
                      isBookmarked={isBookmarked}
                      isWatched={isWatched}
                    />
                  </Route>
                  <Route path="/bookmarks">
                    <BookmarkListPage
                      bookmarks={bookmarks}
                      onToggleBookmark={onToggleBookmark}
                      onToggleWatchStatus={onToggleWatchStatus}
                      isWatched={isWatched}
                    />
                  </Route>
                  <Route path="/stats">
                    <StatsPage content={content} bookmarks={bookmarks} watchStatuses={watchStatuses} />
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
