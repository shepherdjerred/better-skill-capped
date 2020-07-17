import * as React from "react";
import "./footer.css"

export class Footer extends React.Component<unknown, unknown> {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Better Skill Capped by <a href="https://shepherdjerred.com/">Jerred Shepherd</a>. All content is property of{" "}
            <a href="https://www.skill-capped.com/">skill-capped</a>
            Source available on <a href="https://github.com/shepherdjerred/better-skill-capped">GitHub</a>. Licensed
            under the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>
          </p>
        </div>
      </footer>
    );
  }
}
