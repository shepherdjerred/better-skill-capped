import React from "react";

export interface WatchStatusSelectorProps {
  isSelected: boolean;
  onSelectionChange: (newStatus: boolean) => void;
}

export default function WatchStatusSelector({ isSelected, onSelectionChange }: WatchStatusSelectorProps) {
  return (
    <nav className="panel">
      <p className="panel-heading">Watch Status</p>
      <div className="panel-block">
        <p className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isSelected} onClick={() => onSelectionChange(!isSelected)} /> Only show
              unwatched
            </label>
          </div>
        </p>
      </div>
    </nav>
  );
}
