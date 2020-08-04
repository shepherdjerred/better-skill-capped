import React from "react";

export interface ToggleButtonProps {
  status: boolean;
  onToggle: () => void;
  buttonText: (status: boolean) => React.ReactNode;
  classes?: string;
}

export function ToggleButton(props: ToggleButtonProps) {
  const { status, onToggle, buttonText } = props;
  const classes = "button bookmark " + props.classes || "";
  return (
    <button className={classes} onClick={onToggle}>
      {buttonText(status)}
    </button>
  );
}
