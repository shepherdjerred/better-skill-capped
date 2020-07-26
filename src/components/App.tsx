import React from "react";
import {Parser} from "../parser/Parser";
import {Content} from "../model/Content";
import {Router} from "./Router";
import axios from "axios";
import {Bookmark} from "../model/Bookmark";
import {LocalStorageBookmarkDatastore} from "../datastore/LocalStorageBookmarkDatastore";
import {BookmarkDatastore} from "../datastore/BookmarkDatastore";
import {Course} from "../model/Course";
import {WatchStatusDatastore} from "../datastore/WatchStatusDatastore";
import {WatchStatus} from "../model/WatchStatus";
import {LocalStorageWatchStatusDatastore} from "../datastore/LocalStorageWatchStatusDatastore";
import {Video} from "../model/Video";
import * as Sentry from '@sentry/react';
import {Color, Hero, Size} from "./Hero";

export interface AppState {
  content?: Content;
  bookmarkDatastore: BookmarkDatastore;
  bookmarks: Bookmark[];
  watchStatusesDatastore: WatchStatusDatastore;
  watchStatuses: WatchStatus[];
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    const bookmarkDatastore: BookmarkDatastore = new LocalStorageBookmarkDatastore();
    const watchStatusesDatastore: WatchStatusDatastore = new LocalStorageWatchStatusDatastore();

    this.state = {
      content: undefined,
      bookmarkDatastore,
      bookmarks: bookmarkDatastore.get(),
      watchStatusesDatastore,
      watchStatuses: watchStatusesDatastore.get(),
    };
  }

  async componentDidMount() {
    const parser = new Parser();
    const contentJson = await axios.get("/skill-capped-manifest.json");
    const content = parser.parse(JSON.stringify(contentJson.data));
    this.setState({
      content: {
        ...content,
        courses: content.courses.sort((left, right) => right.releaseDate.getTime() - left.releaseDate.getTime()),
      },
    });
  }

  onToggleWatchStatus(item: Video | Course) {
    const { watchStatusesDatastore } = this.state;
    const currentWatchStatus = this.getWatchStatus(item, watchStatusesDatastore.get());

    if (currentWatchStatus !== undefined) {
      watchStatusesDatastore.remove(currentWatchStatus);
    }

    const newStatus = currentWatchStatus !== undefined ? !currentWatchStatus.isWatched : true;

    watchStatusesDatastore.add({
      item,
      isWatched: newStatus,
      lastUpdate: new Date(),
    });

    this.setState({
      watchStatuses: watchStatusesDatastore.get(),
    });
  }

  getWatchStatus(item: Video | Course, watchStatuses: WatchStatus[]) {
    return watchStatuses.find((watchStatus) => {
      return watchStatus.item.uuid === item.uuid;
    });
  }

  onToggleBookmark(item: Video | Course) {
    const { bookmarkDatastore } = this.state;
    const currentBookmark = this.getBookmark(item, bookmarkDatastore.get());
    if (currentBookmark !== undefined) {
      bookmarkDatastore.remove(currentBookmark);
    } else {
      bookmarkDatastore.add({
        item,
        date: new Date(),
      });
    }
    this.setState({
      bookmarks: bookmarkDatastore.get(),
    });
  }

  getBookmark(item: Video | Course, bookmarks: Bookmark[]) {
    return bookmarks.find((bookmark) => {
      return bookmark.item.uuid === item.uuid;
    });
  }

  render() {
    const courses = this.state.content?.courses || [];
    const videos = this.state.content?.videos || [];

    return (
      <React.Fragment>
        <Sentry.ErrorBoundary fallback={<Hero title="Something went wrong" color={Color.RED} size={Size.FULL_WITH_NAVBAR} />}>
          <Router
              courses={courses}
              videos={videos}
              bookmarks={this.state.bookmarks}
              onToggleBookmark={(course: Course) => this.onToggleBookmark(course)}
              watchStatuses={this.state.watchStatuses}
              onToggleWatchStatus={(course: Course) => this.onToggleWatchStatus(course)}
          />
        </Sentry.ErrorBoundary>
      </React.Fragment>
    );
  }
}
