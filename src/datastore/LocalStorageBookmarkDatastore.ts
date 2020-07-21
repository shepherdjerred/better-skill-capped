import { BookmarkDatastore } from "./BookmarkDatastore";
import { Bookmark } from "../model/Bookmark";
import {Course} from "../model/Course";

const IDENTIFIER = "bookmarks";

export class LocalStorageBookmarkDatastore implements BookmarkDatastore {
  add(bookmark: Bookmark): void {
    const existingBookmarks = this.get();
    existingBookmarks.push(bookmark);
    this.set(existingBookmarks);
  }

  get(): Bookmark[] {
    const bookmarks = JSON.parse(window.localStorage.getItem(IDENTIFIER) || "[]");
    console.log(bookmarks);
    return bookmarks;
  }

  remove(bookmark: Bookmark): void {
    const filteredBookmarks = this.get().filter((candidate: Bookmark) => {
      return candidate !== bookmark && (candidate.item as Course).uuid !== (bookmark.item as Course).uuid;
    });
    this.set(filteredBookmarks);
  }

  private set(bookmarks: Bookmark[]) {
    window.localStorage.setItem(IDENTIFIER, JSON.stringify(bookmarks));
  }
}
