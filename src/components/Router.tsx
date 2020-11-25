import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import { Footer } from "./Footer";
import "./Wrapper.css";
import { Color, Hero, Size } from "./Hero";
import { Bookmark, Bookmarkable } from "../model/Bookmark";
import { Watchable, WatchStatus } from "../model/WatchStatus";
import * as Sentry from "@sentry/react";
import { Content } from "../model/Content";
import { OmniSearch } from "./omnisearch/OmniSearch";
import OmniSearchable from "./omnisearch/OmniSearchable";

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
  const { content, onToggleBookmark, onToggleWatchStatus, isBookmarked, isWatched } = props;
  const courses = content?.courses || [];
  const videos = content?.videos || [];
  const commentaries = content?.commentaries || [];
  let items: OmniSearchable[] = [];
  items = items
    .concat(courses, videos, commentaries)
    .sort((left, right) => right.releaseDate.getTime() - left.releaseDate.getTime());

  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <BrowserRouter>
            <Sentry.ErrorBoundary
              fallback={<Hero title="Something went wrong" color={Color.RED} size={Size.FULL_WITH_NAVBAR} />}
              showDialog={true}
            >
              <div>
                <Switch>
                  <Route exact path={["/", "/home"]}>
                    <OmniSearch
                      items={items}
                      onToggleBookmark={onToggleBookmark}
                      onToggleWatchStatus={onToggleWatchStatus}
                      isWatched={isWatched}
                      isBookmarked={isBookmarked}
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
