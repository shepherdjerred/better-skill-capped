import React from "react";
import { Parser } from "../parser/Parser";
import { Content } from "../model/Content";
import { Router } from "./Router";
import axios from "axios";
import { Bookmark, Bookmarkable } from "../model/Bookmark";
import { LocalStorageBookmarkDatastore } from "../datastore/LocalStorageBookmarkDatastore";
import { BookmarkDatastore } from "../datastore/BookmarkDatastore";
import { WatchStatusDatastore } from "../datastore/WatchStatusDatastore";
import { Watchable, WatchStatus } from "../model/WatchStatus";
import { LocalStorageWatchStatusDatastore } from "../datastore/LocalStorageWatchStatusDatastore";
import * as Sentry from "@sentry/react";
import { Color, Hero, Size } from "./Hero";

export interface AppState {
  content?: Content;
  bookmarkDatastore?: BookmarkDatastore;
  bookmarks: Bookmark[];
  watchStatusesDatastore?: WatchStatusDatastore;
  watchStatuses: WatchStatus[];
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      content: undefined,
      bookmarks: [],
      watchStatuses: [],
    };
  }

  async componentDidMount() {
    const parser = new Parser();
    const contentJson = await axios.get("/skill-capped-manifest.json");
    const content = parser.parse(JSON.stringify(contentJson.data));

    console.log(content);

    const bookmarkDatastore: BookmarkDatastore = new LocalStorageBookmarkDatastore(content);
    const watchStatusesDatastore: WatchStatusDatastore = new LocalStorageWatchStatusDatastore();

    this.setState({
      content: {
        ...content,
        courses: content.courses.sort((left, right) => right.releaseDate.getTime() - left.releaseDate.getTime()),
        videos: content.videos.sort((left, right) => right.releaseDate.getTime() - left.releaseDate.getTime()),
        commentaries: content.commentaries.sort(
          (left, right) => right.video.releaseDate.getTime() - left.video.releaseDate.getTime()
        ),
      },
      bookmarkDatastore,
      watchStatusesDatastore,
      bookmarks: bookmarkDatastore.get(),
      watchStatuses: watchStatusesDatastore.get(),
    });
  }

  onToggleWatchStatus(item: Bookmarkable) {
    const { watchStatusesDatastore, watchStatuses } = this.state;
    const currentWatchStatus = this.getWatchStatus(item, watchStatuses);

    if (watchStatusesDatastore === undefined) {
      console.error("Not ready to toggle yet");
    }

    if (currentWatchStatus !== undefined) {
      watchStatusesDatastore!.remove(currentWatchStatus);
    }

    const newStatus = currentWatchStatus !== undefined ? !currentWatchStatus.isWatched : true;

    watchStatusesDatastore!.add({
      item,
      isWatched: newStatus,
      lastUpdate: new Date(),
    });

    this.setState({
      watchStatuses: watchStatusesDatastore!.get(),
    });
  }

  getWatchStatus(item: Bookmarkable, watchStatuses: WatchStatus[]) {
    return watchStatuses.find((watchStatus) => {
      return watchStatus.item.uuid === item.uuid;
    });
  }

  onToggleBookmark(item: Bookmarkable) {
    const { bookmarkDatastore, bookmarks } = this.state;
    const currentBookmark = this.getBookmark(item, bookmarks);

    if (bookmarkDatastore === undefined) {
      console.error("Bookmark datastore not ready yet");
    }

    if (currentBookmark !== undefined) {
      bookmarkDatastore!.remove(currentBookmark);
    } else {
      bookmarkDatastore!.add({
        item,
        date: new Date(),
      });
    }
    this.setState({
      bookmarks: bookmarkDatastore!.get(),
    });
  }

  getBookmark(item: Bookmarkable, bookmarks: Bookmark[]) {
    return bookmarks.find((bookmark) => {
      return bookmark.item.uuid === item.uuid;
    });
  }

  isWatched(item: Watchable) {
    return (
      this.state.watchStatuses.find((watchStatuses) => {
        return watchStatuses.item.uuid === item.uuid && watchStatuses.isWatched;
      }) !== undefined
    );
  }

  isBookmarked(item: Bookmarkable) {
    return (
      this.state.bookmarks.find((bookmark) => {
        return bookmark.item.uuid === item.uuid;
      }) !== undefined
    );
  }

  render() {
    return (
      <React.Fragment>
        <Sentry.ErrorBoundary
          fallback={<Hero title="Something went wrong" color={Color.RED} size={Size.FULL} />}
          showDialog={true}
        >
          <Router
            content={this.state.content}
            bookmarks={this.state.bookmarks}
            onToggleBookmark={(item: Bookmarkable) => this.onToggleBookmark(item)}
            watchStatuses={this.state.watchStatuses}
            onToggleWatchStatus={(item: Watchable) => this.onToggleWatchStatus(item)}
            isBookmarked={this.isBookmarked.bind(this)}
            isWatched={this.isWatched.bind(this)}
          />
        </Sentry.ErrorBoundary>
      </React.Fragment>
    );
  }
}
