import { Hero, Size } from "./Hero";
import React from "react";
import "./Home.sass";

export function Home() {
  return (
    <React.Fragment>
      <Hero title="Better Skill Capped" subtitle="A better way to browse Skill Capped content" size={Size.MEDIUM} />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div className="home-section">
                <h6 className="title is-6">What is this?</h6>
                <p>
                  This is a small webapp that allows easier discovery of content from{" "}
                  <a href="https://skill-capped.com">Skill Capped</a>.
                </p>
              </div>
              <div className="home-section">
                <h6 className="title is-6">Why does this exist?</h6>
                <p>
                  Skill Capped has a lot of great content, but the user interface leaves a lot to be desired. The
                  website is often very slow. There is no built-in search functionality, so it is hard to find all of
                  the videos for a single champion or concept. The site also utilizes lazy loading so it's impractical
                  to use a browsers built-in search to find content.
                </p>
              </div>
              <div className="home-section">
                <h6 className="title is-6">How does it work?</h6>
                <p>
                  Skill Capped embeds a JSON manifest in the HTML that they serve. This JSON manifest contains data
                  about all of the videos on their website such as the title, description, etc. This JSON manifest is
                  downloaded as a part of this web app, and then parsed to provide an interface for discovering Skill
                  Capped content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
