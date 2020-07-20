import React, { ChangeEvent } from "react";
import { Searchbar } from "../Searchbar";
import { CourseSearchResultList } from "./CourseSearchResultList";
import { Course } from "../../model/Course";
import Fuse from "fuse.js";
import { Color, Hero } from "../Hero";
import { Container } from "../Container";
import { CourseSearchResult } from "./CourseSearchResultComponent";

export interface CourseHomeProps {
  courses: Course[];
}

export interface CourseHomeState {
  query: string;
  fuse?: Fuse<Course, Fuse.IFuseOptions<Course>>;
}

export class CourseSearch extends React.Component<CourseHomeProps, CourseHomeState> {
  constructor(props: Readonly<CourseHomeProps>) {
    super(props);

    this.state = {
      ...this.setupSearch(),
      query: "",
    };
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

    const options = {
      keys: ["title", "description", "videos.video.title", "videos.video.altTitle"],
      minMatchCharLength: 2,
      threshold: 0.3,
      useExtendedSearch: true,
      includeMatches: true,
      ignoreLocation: true,
      includeScore: true,
    };

    const index = Fuse.createIndex(options.keys, courses);

    return {
      fuse: new Fuse<Course, Fuse.IFuseOptions<Course>>(courses, options, index),
    };
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
          <CourseSearchResultList results={results} />
        </Container>
      </React.Fragment>
    );
  }
}
