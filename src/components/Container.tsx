import React from "react";

export interface ContainerProps {
  children: React.ReactNode;
}

export class Container extends React.Component<ContainerProps, unknown> {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">{this.props.children}</div>
          </div>
        </div>
      </section>
    );
  }
}
