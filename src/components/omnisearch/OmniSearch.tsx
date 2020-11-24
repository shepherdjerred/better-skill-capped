import { Bookmarkable } from "../../model/Bookmark";
import { Watchable } from "../../model/WatchStatus";
import React from "react";
import Search from "./search/Search";
import OmniSearchable, { searchableFields } from "./OmniSearchable";
import { OmniSearchResult } from "./OmniSearchResult";

export interface OmniSearchProps {
  items: OmniSearchable[];
  isWatched: (item: Watchable) => boolean;
  isBookmarked: (item: Bookmarkable) => boolean;
  onToggleBookmark: (item: Bookmarkable) => void;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function OmniSearch({ items, isWatched, isBookmarked, onToggleBookmark, onToggleWatchStatus }: OmniSearchProps) {
  const fuseOptions = {
    keys: searchableFields,
    minMatchCharLength: 2,
    threshold: 0.3,
    useExtendedSearch: true,
    includeMatches: true,
    ignoreLocation: true,
    includeScore: true,
  };

  return (
    <Search
      items={items}
      fuseOptions={fuseOptions}
      render={(item) => (
        <OmniSearchResult
          item={item.item}
          isWatched={isWatched}
          isBookmarked={isBookmarked}
          onToggleBookmark={onToggleBookmark}
          onToggleWatchStatus={onToggleWatchStatus}
          matchedStrings={item.matchedStrings}
        />
      )}
      itemsPerPage={20}
      searchBarPlaceholder="Search for courses, videos, or game commentary"
    />
  );
}
