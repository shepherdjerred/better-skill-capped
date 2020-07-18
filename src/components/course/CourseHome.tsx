import React, {ChangeEvent} from "react";
import {Searchbar} from "../Searchbar";
import {CourseList} from "./CourseList";
import {Course} from "../../model/Course";
import Fuse from "fuse.js";
import {Hero} from "../Hero";
import {Container} from "../Container";

export interface CourseHomeProps {
  courses: Course[]
}

export interface CourseHomeState {
  search: string;
  fuse: Fuse<Course, Fuse.IFuseOptions<Course>>;
}

export class CourseHome extends React.Component<CourseHomeProps, CourseHomeState> {
  constructor(props: Readonly<CourseHomeProps>) {
    super(props);

    const courses = this.props.courses;

    const options = {
      keys: ["title", "description", "videos.video.title", "videos.video.description"],
    };

    const index = Fuse.createIndex(options.keys, courses);

    this.state = {
      fuse: new Fuse<Course, Fuse.IFuseOptions<Course>>(courses, options, index),
      search: "",
    }
  }

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      search: event.target.value || "",
    });
  }

  findCourses(): Course[] {
    const allCourses = this.props.courses;
    const query = this.state.search;
    const fuse = this.state.fuse;

    if (query === "") {
      return allCourses;
    } else {
      return fuse.search(query).map((result) => result.item);
    }
  }

  render() {
    const courses = this.findCourses();
    return (
        <React.Fragment>
          <Hero title="Courses" subtitle=""/>
          <Container>
            <Searchbar onUpdate={this.onFilter.bind(this)}/>
            <CourseList courses={courses}/>
          </Container>
        </React.Fragment>
    )

  }
}
