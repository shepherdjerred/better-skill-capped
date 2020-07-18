import React, { ChangeEvent } from "react";

export interface FilterBarProps {
  onUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
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
    this.setState({
      ...this.state,
      value: event.target.value || "",
    });
    this.props.onUpdate(event);
  }

  render() {
    return (
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={this.state.value}
            placeholder="Search Courses"
            onChange={this.onUpdate.bind(this)}
          />
        </div>
      </div>
    );
  }
}
