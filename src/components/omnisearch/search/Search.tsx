import React from "react";
import { Searchbar } from "./Searchbar";
import PaginatedFuseSearch from "./PaginatedFuseSearch";
import Fuse from "fuse.js";
import { FuseSearchResult } from "./FuseSearch";
import { Container } from "../../Container";
import FilterSelector from "../filter/FilterSelector";
import { Filters } from "../filter/Filters";
import { isCommentary } from "../../../model/Commentary";
import { isCourse } from "../../../model/Course";
import { isVideo } from "../../../model/Video";
import { Watchable } from "../../../model/WatchStatus";
import { Bookmarkable } from "../../../model/Bookmark";
import Banner, { BannerType } from "../../Banner";
import Type, { getType } from "../../../model/Type";
import { Role } from "../../../model/Role";

export interface SearchProps<T> {
  items: T[];
  fuseOptions: Fuse.IFuseOptions<T>;
  render: (items: FuseSearchResult<T>) => React.ReactNode;
  itemsPerPage: number;
  searchBarPlaceholder: string;
  isWatched: (item: Watchable) => boolean;
  isBookmarked: (item: Bookmarkable) => boolean;
}

interface SearchState {
  query: string;
  filters: Filters;
}

export default class Search<T> extends React.PureComponent<SearchProps<T>, SearchState> {
  constructor(props: SearchProps<T>) {
    super(props);

    const defaultFilters: Filters = {
      roles: [Role.ALL, Role.ADC, Role.TOP, Role.SUPPORT, Role.JUNGLE, Role.MID],
      types: [Type.COURSE, Type.VIDEO, Type.COMMENTARY],
      onlyBookmarked: false,
      onlyUnwatched: true,
      onlyWatched: false,
      onlyUnbookmarked: false,
    };

    this.state = {
      query: "",
      filters: defaultFilters,
    };
  }

  onQueryUpdate(newValue: string): void {
    this.setState((state) => {
      return {
        ...state,
        query: newValue,
      };
    });
  }

  onFiltersUpdate(newValue: Filters): void {
    this.setState((state) => {
      return {
        ...state,
        filters: newValue,
      };
    });
  }

  render(): React.ReactElement {
    const { items, fuseOptions, render, itemsPerPage, searchBarPlaceholder, isBookmarked, isWatched } = this.props;
    const { query, filters } = this.state;

    // TODO this is very hacky. fix it.
    const filteredItems = items
      .filter((item) => {
        if (isVideo(item) || isCourse(item) || isCommentary(item)) {
          return filters.roles.find((role) => role === item.role) !== undefined;
        } else {
          return false;
        }
      })
      .filter((item) => {
        if (filters.onlyBookmarked) {
          if (isVideo(item) || isCourse(item) || isCommentary(item)) {
            return isBookmarked(item);
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (filters.onlyUnbookmarked) {
          if (isVideo(item) || isCourse(item) || isCommentary(item)) {
            return !isBookmarked(item);
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (filters.onlyUnwatched) {
          if (isVideo(item) || isCourse(item) || isCommentary(item)) {
            return !isWatched(item);
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (filters.onlyWatched) {
          if (isVideo(item) || isCourse(item) || isCommentary(item)) {
            return isWatched(item);
          } else {
            return false;
          }
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (isVideo(item) || isCourse(item) || isCommentary(item)) {
          const type = getType(item);
          return filters.types.find((candidate) => candidate === type) !== undefined;
        } else {
          return false;
        }
      });

    return (
      <>
        <Searchbar onValueUpdate={this.onQueryUpdate.bind(this)} placeholder={searchBarPlaceholder} />
        <Container sidebar={<FilterSelector filters={filters} onFiltersUpdate={this.onFiltersUpdate.bind(this)} />}>
          <Banner type={BannerType.Info}>
            Better Skill Capped has been updated to properly link to videos belonging to a course. Please open a{" "}
            <a href="https://github.com/shepherdjerred/better-skill-capped/issues/new">GitHub Issue</a> if you encounter
            any issues.
          </Banner>
          <Banner type={BannerType.Primary}>
            Want to receive updates about Better Skill Capped? Sign up for our{" "}
            <a href="https://betterskillcapped.substack.com/?r=er400&utm_campaign=pub&utm_medium=web&utm_source=copy">
              mailing list
            </a>
            !
          </Banner>
          <PaginatedFuseSearch
            query={query}
            items={filteredItems}
            fuseOptions={fuseOptions}
            render={render}
            itemsPerPage={itemsPerPage}
          />
        </Container>
      </>
    );
  }
}
