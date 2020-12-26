import React from "react";

export default function TypeSelector() {
  return (
    <nav className="panel">
      <p className="panel-heading">Type</p>
      <div className="panel-block">
        <p className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" /> Video
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" /> Commentary
            </label>
          </div>
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" /> Course
            </label>
          </div>
        </p>
      </div>
    </nav>
  );
}
