import React from "react";
import { ToggleButton } from "./ToggleButton";
import { Watchable } from "../model/WatchStatus";

export interface ToggleWatchStatusButtonProps {
  item: Watchable;
  isWatched: boolean;
  onToggleWatchStatus: (item: Watchable) => void;
}

export function ToggleWatchStatusButton(props: ToggleWatchStatusButtonProps) {
  const { item, isWatched, onToggleWatchStatus } = props;
  return (
    <ToggleButton
      status={isWatched}
      onToggle={() => onToggleWatchStatus(item)}
      buttonText={(status) => (status ? "Mark as unwatched" : "Mark as watched")}
    />
  );
}
