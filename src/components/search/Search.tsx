import React from "react";
import { Searchbar } from "../Searchbar";
import PaginatedFuseSearch from "./PaginatedFuseSearch";
import Fuse from "fuse.js";
import { FuseSearchResult } from "./FuseSearch";

export interface SearchProps<T> {
  items: T[];
  fuseOptions: Fuse.IFuseOptions<T>;
  render: (items: FuseSearchResult<T>) => React.ReactNode;
  itemsPerPage: number;
  searchBarPlaceholder: string;
}

interface SearchState {
  query: string;
}

export default class Search<T> extends React.PureComponent<SearchProps<T>, SearchState> {
  constructor(props: SearchProps<T>) {
    super(props);

    this.state = {
      query: "",
    };
  }

  onQueryUpdate(newValue: string) {
    this.setState((state) => {
      return {
        ...state,
        query: newValue,
      };
    });
  }

  render() {
    const { items, fuseOptions, render, itemsPerPage, searchBarPlaceholder } = this.props;
    const { query } = this.state;

    return (
      <>
        <Searchbar onValueUpdate={this.onQueryUpdate.bind(this)} placeholder={searchBarPlaceholder} />
        <PaginatedFuseSearch
          query={query}
          items={items}
          fuseOptions={fuseOptions}
          render={render}
          itemsPerPage={itemsPerPage}
        />
      </>
    );
  }
}
