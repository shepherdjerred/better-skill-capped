import React from "react";
import { Parser } from "../parser/Parser";
import { Content } from "../model/Content";
import { ErrorBoundary, ErrorPageType } from "./ErrorBoundary";
import { Router } from "./Router";
import axios from "axios";
import { Bookmark } from "../model/Bookmark";
import { LocalStorageBookmarkDatastore } from "../datastore/LocalStorageBookmarkDatastore";
import { BookmarkDatastore } from "../datastore/BookmarkDatastore";
import { Course } from "../model/Course";

export interface AppState {
  content?: Content;
  bookmarkDatastore: BookmarkDatastore;
  bookmarks: Bookmark[];
}

export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    const bookmarkDatastore: BookmarkDatastore = new LocalStorageBookmarkDatastore();

    this.state = {
      content: undefined,
      bookmarkDatastore,
      bookmarks: bookmarkDatastore.get(),
    };
  }

  async componentDidMount() {
    const parser = new Parser();
    const contentJson = await axios.get("/skill-capped-manifest.json");
    const content = parser.parse(JSON.stringify(contentJson.data));
    this.setState({
      content,
    });
  }

  onToggleBookmark(course: Course) {
    const { bookmarkDatastore } = this.state;
    const currentBookmark = this.getBookmark(course, bookmarkDatastore.get());
    if (currentBookmark !== undefined) {
      bookmarkDatastore.remove(currentBookmark);
    } else {
      bookmarkDatastore.add({
        item: course,
        date: new Date(),
      });
    }
    this.setState({
      bookmarks: bookmarkDatastore.get(),
    });
  }

  getBookmark(course: Course, bookmarks: Bookmark[]) {
    return bookmarks.find((bookmark) => {
      return "uuid" in bookmark.item && bookmark.item.uuid === course.uuid;
    });
  }

  render() {
    const courses = this.state.content?.courses || [];

    return (
      <React.Fragment>
        <ErrorBoundary type={ErrorPageType.FULL}>
          <Router
            courses={courses}
            bookmarks={this.state.bookmarks}
            onToggleBookmark={(course: Course) => this.onToggleBookmark(course)}
          />
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}
