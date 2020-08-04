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
                  Capped content. The JSON manifest is pulled every ten minutes from skill capped as part of{" "}
                  <a href="https://github.com/shepherdjerred/skill-capped-fetcher">another project</a> of mine. This
                  means that when new videos are posted onto skill capped it might take up to ten minutes for it to
                  reflect on this website.
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
                  through <a href="https://aws.amazon.com/cloudfront/reporting/">AWS CloudFront</a> which is how this
                  project is hosted. I also collect errors through <a href="https://sentry.io/">Sentry</a> which allows
                  me to debug issues that users run into.
                  <br />
                  <br />
                  I'm not making any kind of a profit through this tool. It's simply a project that I enjoy working on
                  and it allows me to use Skill Capped more effectively.
                </p>
              </div>
              <div className="home-section">
                <h6 className="title is-6">How does the download button work?</h6>
                <p>
                  Skill Capped stores their videos in the <a href="https://en.wikipedia.org/wiki/M3U">M3U8</a> format.
                  The download button links to this file which causes your browser to download it. This file allows you
                  to stream videos through video players like <a href="https://www.videolan.org/vlc/index.html">VLC</a>.
                  If you don't have a Skill Capped subscription then the download button will not function. Your
                  subscription is not checked in any way by this site. All authentication/authorization is done by Skill
                  Capped.
                </p>
              </div>
              <div className="home-section">
                <h6 className="title is-6">How is my data (i.e. bookmarks, watch status) stored?</h6>
                <p>
                  Better Skill Capped does not store any data except for locally on your computer. There are no servers
                  containing your bookmarks or watch history. All data is stored in yours browser's{" "}
                  <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">local storage</a>. This
                  means that your data does not sync across devices, and you will lose your data if you clear site data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
