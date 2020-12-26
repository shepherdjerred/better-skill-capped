import React from "react";

export default function WatchStatusSelector() {
  return (
    <nav className="panel">
      <p className="panel-heading">Watch Status</p>
      <div className="panel-block">
        <p className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" /> Only show unwatched
            </label>
          </div>
        </p>
      </div>
    </nav>
  );
}
