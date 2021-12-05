import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import "./TipsButton.css";

export function TipsButton(): React.ReactElement {
  return (
    <div className="tips-button">
      <button className="button is-rounded is-primary is-outlined">
        <span className="is-icon is-small">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </span>
      </button>
    </div>
  );
}
