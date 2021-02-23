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
        <div className="control">
          <div className="field">
            <label className="checkbox">
              <input type="checkbox" checked={isSelected} onChange={() => onSelectionChange(!isSelected)} /> Only show
              unwatched
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
