import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CourseSearch } from "./course/CourseSearch";
import React from "react";
import { Course } from "../model/Course";
import { Home } from "./Home";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./Wrapper.css";

export interface RouterProps {
  courses: Course[];
}

export class Router extends React.Component<RouterProps, unknown> {
  render() {
    return (
      <React.Fragment>
        <div className="page-wrapper">
          <div className="content-wrapper">
            <BrowserRouter>
              <Navbar />
              <div>
                <Switch>
                  <Route path="/courses">
                    <CourseSearch courses={this.props.courses} />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </BrowserRouter>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
