import * as React from "react";

export function Footer(): React.ReactElement {
  const commit = process.env.GITHUB_SHA || "";
  const commitUrl = "https://github.com/shepherdjerred/better-skill-capped/commit/" + commit;
  const releaseMessage = commit !== "" ? <a href={commitUrl}>{commit.substr(0, 7)}</a> : "unknown";
  const showDownloadButton = !window.localStorage.getItem("download");
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Better Skill Capped by <a href="https://shepherdjerred.com/">Jerred Shepherd</a>.
          <br />
          Have a problem? Open an issue on{" "}
          <a href="https://github.com/shepherdjerred/better-skill-capped/issues/new">GitHub</a>
          <br />
          All content is property of <a href="https://www.skill-capped.com/">Skill Capped</a>.
          <br />
          This project is in no way endorsed or affiliated with Skill Capped.
          <br />
          Source available on <a href="https://github.com/shepherdjerred/better-skill-capped">GitHub</a>. Licensed under
          the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>.
          <br />
          Release {releaseMessage}.
          <br />{" "}
          {showDownloadButton && (
            <span
              className="button is-text"
              onClick={() => {
                window.localStorage.setItem("download", "true");
                window.location.reload();
              }}
            >
              Enable downloads
            </span>
          )}
          <br />
        </p>
      </div>
    </footer>
  );
}
