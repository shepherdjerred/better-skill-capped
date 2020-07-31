import Fuse from "fuse.js";
import React from "react";

// Crisp abstractions are nice, but using Fuse's types is easier :)
export interface FuseSearchProps<T> {
  query?: string;
  items: T[];
  options: Fuse.IFuseOptions<T>;
  render: (items: FuseSearchResult<T>[]) => React.ReactNode;
}

export interface FuseSearchState<T> {
  fuse: Fuse<T, Fuse.IFuseOptions<T>>;
}

export interface FuseSearchResult<T> {
  item: T;
  matchedStrings: string[];
}

export class FuseSearch<T> extends React.PureComponent<FuseSearchProps<T>, FuseSearchState<T>> {
  constructor(props: Readonly<FuseSearchProps<T>>) {
    super(props);

    const { items, options } = this.props;

    this.state = {
      fuse: createIndexedFuseInstance(items, options),
    };
  }

  componentDidUpdate(prevProps: Readonly<FuseSearchProps<T>>) {
    // This prevents us from rebuilding fuse if our items haven't changed
    // This happens a lot when a user is typing which results in updates to the "query" prop
    this.rebuildFuseIfNeeded(this.props.items, prevProps.items);
  }

  rebuildFuseIfNeeded(currentItems: T[], previousItems: T[]) {
    if (currentItems === previousItems) {
      return;
    }
    const areItemsTheSameSize = currentItems.length === previousItems.length;
    const areItemsTheSame = currentItems.every((item) => previousItems.includes(item));

    const shouldRebuildFuse = !(areItemsTheSameSize || areItemsTheSame);

    if (shouldRebuildFuse) {
      this.setState({
        fuse: createIndexedFuseInstance(currentItems, this.props.options),
      });
    } else {
      console.log(`No need to rebuild fuse. Same items size: ${areItemsTheSameSize}, Same items: ${areItemsTheSame}`);
    }
  }

  getResults() {
    const { fuse } = this.state;
    const { query } = this.props;

    if (query !== undefined && query !== "") {
      const fuseResults = fuse.search(query || "");

      return fuseResults.map((result) => {
        const { item, matches } = result;
        const matchedStrings = (matches || [])
          .map((match) => {
            const { indices, value } = match;
            return indices.map((index) => {
              if (value !== undefined) {
                return value.substr(index[0], index[1] + 1);
              } else {
                return "";
              }
            });
          })
          .flat()
          .filter((value, index, self) => self.indexOf(value) === index);

        return {
          item,
          matchedStrings,
        };
      });
    } else {
      return this.props.items.map((item) => {
        return {
          item,
          matchedStrings: [],
        };
      });
    }
  }

  render() {
    const { render } = this.props;
    const results = this.getResults();

    return render(results);
  }
}

function createIndexedFuseInstance<T>(items: T[], options: Fuse.IFuseOptions<T>) {
  // This should only occur when the items or options have changed
  console.log("Building Fuse instance");
  const index = Fuse.createIndex(options.keys || [], items);
  return new Fuse<T, Fuse.IFuseOptions<T>>(items, options, index);
}
