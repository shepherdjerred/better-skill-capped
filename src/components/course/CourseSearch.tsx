import React, { ChangeEvent } from "react";
import { Searchbar } from "../Searchbar";
import { CourseSearchResultList } from "./CourseSearchResultList";
import { Course } from "../../model/Course";
import Fuse from "fuse.js";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { CourseSearchResult } from "./CourseSearchResultComponent";
import { Bookmark } from "../../model/Bookmark";
import { Role } from "../../model/Role";
import { WatchStatus } from "../../model/WatchStatus";

export interface CourseHomeProps {
  courses: Course[];
  bookmarks: Bookmark[];
  onToggleBookmark: (course: Course) => void;
  watchStatuses: WatchStatus[];
  onToggleWatchStatus: (course: Course) => void;
}

export interface CourseHomeState {
  query: string;
  fuse?: Fuse<Course, Fuse.IFuseOptions<Course>>;
  queryRoles: Role[];
}

export class CourseSearch extends React.Component<CourseHomeProps, CourseHomeState> {
  constructor(props: Readonly<CourseHomeProps>) {
    super(props);

    this.state = {
      fuse: undefined,
      query: "",
      queryRoles: [],
    };

    this.setupSearch();
  }

  componentDidUpdate(prevProps: CourseHomeProps) {
    const courses = this.props.courses;
    if (prevProps.courses === courses) {
      return;
    }

    this.setState(this.setupSearch());
  }

  setupSearch() {
    const courses = this.props.courses;
    const roleCourses = courses.filter((course) => {
      if (this.state.queryRoles.length === 0) {
        return true;
      }

      return this.state.queryRoles.filter((role) => role === course.role);
    });

    const options = {
      keys: ["title", "description", "videos.video.title", "videos.video.altTitle"],
      minMatchCharLength: 2,
      threshold: 0.3,
      useExtendedSearch: true,
      includeMatches: true,
      ignoreLocation: true,
      includeScore: true,
    };

    const index = Fuse.createIndex(options.keys, roleCourses);

    return {
      fuse: new Fuse<Course, Fuse.IFuseOptions<Course>>(roleCourses, options, index),
    };
  }

  onRoleToggle(role: Role) {
    console.trace(`Toggling ${role}`);
    const { queryRoles } = this.state;
    if (queryRoles.find((candidate) => candidate === role) !== undefined) {
      this.setState({
        queryRoles: queryRoles.filter((candidate) => candidate !== role),
      });
    } else {
      this.setState({
        queryRoles: [...queryRoles, role],
      });
    }
    console.trace(`New state: ${JSON.stringify(this.state)}`);
    this.setState({
      ...this.setupSearch(),
    });
  }

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      query: event.target.value || "",
    });
  }

  searchCourses(): CourseSearchResult[] {
    const allCourses = this.props.courses;
    const query = this.state.query;
    const fuse = this.state.fuse;

    if (fuse === undefined || query === "") {
      return allCourses.map((course) => {
        return {
          course,
          matches: [],
        };
      });
    } else {
      const result = fuse.search(query);
      console.debug("Result: ", result);
      return result.map((result) => {
        const course = result.item;
        const matches: string[] = (result.matches || [])
          .map((match) => {
            const indexes = match.indices;
            const value = match.value;
            return indexes.map((index) => {
              if (value !== undefined) {
                return value.substr(index[0], index[1] + 1);
              } else {
                return "";
              }
            });
          })
          .flat()
          .filter((value, index, self) => self.indexOf(value) === index);

        console.debug(matches);
        return {
          course: course,
          matches,
        };
      });
    }
  }

  render() {
    const results = this.searchCourses();
    return (
      <React.Fragment>
        <Hero title="Course Search" color={Color.TEAL} />
        <Container>
          <Searchbar onUpdate={this.onFilter.bind(this)} />
          <CourseSearchResultList
            results={results}
            bookmarks={this.props.bookmarks}
            onToggleBookmark={this.props.onToggleBookmark}
            watchStatuses={this.props.watchStatuses}
            onToggleWatchStatus={this.props.onToggleWatchStatus}
          />
        </Container>
      </React.Fragment>
    );
  }
}
