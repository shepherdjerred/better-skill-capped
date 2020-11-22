import React, { ChangeEvent } from "react";

export interface FilterBarProps {
  onValueUpdate: (newValue: string) => void;
  placeholder: string;
}

export interface FilterBarState {
  value: string;
}

export class Searchbar extends React.Component<FilterBarProps, FilterBarState> {
  constructor(props: FilterBarProps) {
    super(props);
    this.state = {
      value: "",
    };
  }

  onUpdate(event: ChangeEvent<HTMLInputElement>) {
    event.persist();
    this.setState((state) => {
      return {
        ...state,
        value: event.target.value || "",
      };
    });
    this.props.onValueUpdate(event.target.value);
  }

  render() {
    return (
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.onUpdate.bind(this)}
          />
        </div>
      </div>
    );
  }
}
