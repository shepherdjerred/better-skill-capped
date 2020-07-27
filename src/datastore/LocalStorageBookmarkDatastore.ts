import {BookmarkDatastore} from "./BookmarkDatastore";
import {Bookmark} from "../model/Bookmark";
import {Content} from "../model/Content";
import {Video} from "../model/Video";
import {Course} from "../model/Course";

const IDENTIFIER = "bookmarks";

export class LocalStorageBookmarkDatastore implements BookmarkDatastore {
  private readonly content: Content;

  constructor(content: Content) {
    this.content = content;
  }

  add(bookmark: Bookmark): void {
    const existingBookmarks = this.get();
    existingBookmarks.push(bookmark);
    this.set(existingBookmarks);
  }

  get(): Bookmark[] {
    const bookmarks: Bookmark[] = JSON.parse(window.localStorage.getItem(IDENTIFIER) || "[]");
    const updatedBookmarks: Bookmark[] = bookmarks.flatMap((bookmark) => {
      let matchedItem: Course | Video | undefined;

      if ("videos" in bookmark.item) {
        matchedItem = this.content.courses.find((course) => {
          return course.uuid === bookmark.item.uuid;
        });
      } else {
        matchedItem = this.content.videos.find((video) => {
          return video.uuid === bookmark.item.uuid;
        })
      }

      if (matchedItem === undefined) {
        console.debug(`Couldn't find matching item for bookmark ${bookmark}`);
        return [];
      } else {
        return {
          ...bookmark,
          item: matchedItem
        }
      }
    })
    console.debug(updatedBookmarks);
    return updatedBookmarks;
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
