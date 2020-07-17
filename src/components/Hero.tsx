import React from "react";

export interface HeroProps {
  title: string;
  subtitle: string;
}

export class Hero extends React.Component<HeroProps, unknown> {
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{this.props.title}</h1>
            <h2 className="subtitle">{this.props.subtitle}</h2>
          </div>
        </div>
      </section>
    );
  }
}
