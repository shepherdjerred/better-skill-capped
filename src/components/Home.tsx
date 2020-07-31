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
                <br />
                <p>
                  It's a content work in progress. I have a job, so this is more of a passion project than anything. The
                  site might be broken occasionally, but since I use it myself I try to keep it in a working state while
                  adding on features every once in a while. If you discover something is wrong with the website or you
                  have a feature request please open an issue on{" "}
                  <a href="https://github.com/shepherdjerred/better-skill-capped/issues">GitHub</a>.
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
                  downloaded as a part of this web app. It is then parsed to provide an interface for discovering Skill
                  Capped content. The JSON manifest is pulled on the hour from skill capped as part of{" "}
                  <a href="https://github.com/shepherdjerred/skill-capped-fetcher">another project</a> of mine. This
                  means that when new videos are posted onto skill capped it might take up to an hour for it to reflect
                  on this website.
                </p>
              </div>
              <div className="home-section">
                <h6 className="title is-6">Is this sketchy?</h6>
                <p>
                  Nope!
                  <br />
                  <br />
                  You don't have to trust me though. This project is fully open sourced on{" "}
                  <a href="https://github.com/shepherdjerred/better-skill-capped">GitHub</a>. Feel free to go through
                  the code. There are no client-side analytics or ads of any kind, but some information is collected
                  through <a href="https://aws.amazon.com/cloudfront/">AWS CloudFront</a> which is how this project is
                  hosted. I also collect errors through <a href="https://sentry.io/">Sentry</a> which allows me to debug
                  issues that users run into.
                  <br />
                  <br />
                  I'm not making any kind of a profit through this tool. It's simply a project that I enjoy working on
                  and it allows me to use Skill Capped more effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
