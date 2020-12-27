import React from "react";

export interface BookmarkStatusSelectorProps {
  isSelected: boolean;
  onSelectionChange: (newStatus: boolean) => void;
}

export default function BookmarkStatusSelector({ isSelected, onSelectionChange }: BookmarkStatusSelectorProps) {
  return (
    <nav className="panel">
      <p className="panel-heading">Watch Status</p>
      <div className="panel-block">
        <p className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isSelected} onClick={() => onSelectionChange(!isSelected)} /> Only show
              bookmarked
            </label>
          </div>
        </p>
      </div>
    </nav>
  );
}
