import React from "react";

export default function BookmarkStatusSelector() {
  return (
    <nav className="panel">
      <p className="panel-heading">Bookmark Status</p>
      <div className="panel-block">
        <p className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" /> Only show bookmarked
            </label>
          </div>
        </p>
      </div>
    </nav>
  );
}
