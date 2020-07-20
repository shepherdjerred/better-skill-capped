import React from "react";
import { Color, Hero, Size } from "./Hero";

export interface ErrorPageProps {
  children: React.ReactNode;
  type: ErrorPageType;
}

export enum ErrorPageType {
  FULL,
  FULL_WITH_NAVBAR,
}

export interface ErrorPageState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorPageProps, ErrorPageState> {
  constructor(props: Readonly<ErrorPageProps>) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  getHeroSize(pageType: ErrorPageType): Size {
    switch (pageType) {
      case ErrorPageType.FULL:
        return Size.FULL;
      case ErrorPageType.FULL_WITH_NAVBAR:
        return Size.FULL_WITH_NAVBAR;
    }
  }

  render() {
    if (this.state.hasError) {
      return <Hero title="Something went wrong" color={Color.RED} size={this.getHeroSize(this.props.type)} />;
    } else {
      return this.props.children;
    }
  }
}
