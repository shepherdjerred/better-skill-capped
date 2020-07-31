import { Bookmarkable } from "../model/Bookmark";
import React from "react";
import { ToggleButton } from "./ToggleButton";

export interface BookmarkButtonProps {
  item: Bookmarkable;
  isBookmarked: boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
}

export function ToggleBookmarkButton(props: BookmarkButtonProps) {
  const { item, isBookmarked, onToggleBookmark } = props;
  return (
    <ToggleButton
      status={isBookmarked}
      onToggle={() => onToggleBookmark(item)}
      buttonText={(status) => (status ? "Unbookmark" : "Bookmark")}
      classes={"is-warning"}
    />
  );
}
