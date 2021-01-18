import React from "react";

export interface ContainerProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export function Container(props: ContainerProps) {
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns">
          <div className="column is-one-fifth is-offset-1">{props.sidebar}</div>
          <div className="column is-two-fifths">{props.children}</div>
        </div>
      </div>
    </section>
  );
}
