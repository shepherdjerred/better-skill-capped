import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CourseHome } from "./course/CourseHome";
import React from "react";
import { Course } from "../model/Course";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export interface RouterProps {
  courses: Course[];
}

export class Router extends React.Component<RouterProps, unknown> {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <div>
            <Switch>
              <Route path="/courses">
                <CourseHome courses={this.props.courses} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </React.Fragment>
    );
  }
}
