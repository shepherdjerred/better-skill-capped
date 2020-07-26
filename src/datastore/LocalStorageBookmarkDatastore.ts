import { BookmarkDatastore } from "./BookmarkDatastore";
import { Bookmark } from "../model/Bookmark";

const IDENTIFIER = "bookmarks";

export class LocalStorageBookmarkDatastore implements BookmarkDatastore {
  add(bookmark: Bookmark): void {
    const existingBookmarks = this.get();
    existingBookmarks.push(bookmark);
    this.set(existingBookmarks);
  }

  get(): Bookmark[] {
    const bookmarks = JSON.parse(window.localStorage.getItem(IDENTIFIER) || "[]");
    console.trace(bookmarks);
    return bookmarks;
  }

  remove(bookmark: Bookmark): void {
    const filteredBookmarks = this.get().filter((candidate: Bookmark) => {
      return candidate !== bookmark && candidate.item.uuid !== bookmark.item.uuid;
    });
    this.set(filteredBookmarks);
  }

  private set(bookmarks: Bookmark[]) {
    window.localStorage.setItem(IDENTIFIER, JSON.stringify(bookmarks));
  }
}
